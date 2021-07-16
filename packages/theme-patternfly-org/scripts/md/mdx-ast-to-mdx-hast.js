const fs = require('fs');
const path = require('path');
const toHAST = require('mdast-util-to-hast');
const detab = require('detab');
const normalize = require('mdurl/encode');
const all = require('mdast-util-to-hast/lib/all');
const styleToObject = require('style-to-object');
const camelCaseCSS = require('camelcase-css');
const { parseJSXAttributes } = require('./jsxAttributes');
const { getExampleDeclaration, prettyExampleCode } = require('../../helpers/codesandbox');
const { liveCodeTypes } = require('../../helpers/liveCodeTypes');

let srcCounter = 0;

// Adapted from https://github.com/mdx-js/mdx/blob/next/packages/mdx/mdx-ast-to-mdx-hast.js
function mdxAstToMdxHast({ mdExternal, source }) {
  return (tree, file) => {
    const srcImports = [];

    function imageHandler(h, node) {
      const { src, ...rest } = node.props || {};
      const srcImport = `srcImport${srcCounter++}`;
      const url = (node.url || src).replace(/'/g, "\\'");
      const props = {
        src: srcImport,
        alt: node.alt,
        title: node.title,
        isResponsive: /\.(png|jpe?g|webp)$/.test(url),
        ...rest
      };
      // Add import statement
      srcImports.push({
        type: 'import',
        value: `import ${srcImport} from '${url}';`
      });
    
      return h(node, 'img', props);
    }

    function mdxExpression(h, node) {
      // Treat JSX <img> tags like commonmark ![]() image tags
      if (node.name === 'img') {
        node.props = node.attributes.reduce((acc, attr) => {
          acc[attr.name] = attr.value;
          return acc;
        }, {});
        if (typeof node.props.src === 'string') {
          return imageHandler(h, node);
        }
      }
      node.attributes.forEach(attr => {
        // style="backgroundcolor: black" -> style={{backgroundColor: "black"}}
        if (attr.name === 'style' && typeof attr.value === 'string') {
          const styleObject = {};
          styleToObject(attr.value, (name, value) => styleObject[camelCaseCSS(name)] = value);
          attr.value = {
            type: 'mdxValueExpression',
            value: JSON.stringify(styleObject)
          };
        }
    
        // class="my-class" -> className="my-class"
        if (attr.name === 'class') {
          attr.name = 'className';
        }
      });

      return Object.assign({}, node, {children: all(h, node)});
    }

    const handlers = {
      // `inlineCode` gets passed as `code` by the HAST transform.
      // This makes sure it ends up being `inlineCode`
      inlineCode(h, node) {
        return Object.assign({}, node, {
          type: 'element',
          tagName: 'code',
          properties: {},
          children: [
            {
              type: 'text',
              value: node.value
            }
          ]
        });
      },
      code(h, node) {
        const properties = {
          code: node.value ? detab(node.value + '\n').trim() : '',
          title: node.title
        };
        
        if (node.lang) {
          properties.lang = node.lang;
        }

        if (node.meta) {
          try {
            const dirname = path.dirname(file.history[0]);
            Object.entries(parseJSXAttributes(`<Component ${node.meta} />`))
              .forEach(([key, val]) => {
                if (key === 'file') {
                  const filePath = path.join(dirname, val);
                  properties.code = fs.readFileSync(filePath, 'utf8');
                  properties.file = filePath;
                  mdExternal[file.history[0]] = mdExternal[file.history[0]] || { source, files: [] };
                  mdExternal[file.history[0]].files.push(filePath);
                } else {
                  properties[key] = val;
                }
              });
          }
          catch(error) {
            file.fail(`Error parsing "${node.meta}": ${error}`);
          }
        }
        if (liveCodeTypes.includes(node.lang) && node.lang !== 'html' && !properties.noLive) {
          try {
            const declaration = getExampleDeclaration(properties.code);
            if (
              declaration.type === 'ExpressionStatement' &&
              declaration.expression.type === 'JSXElement'
            ) {
              // Lone JSX
              properties.code = prettyExampleCode(node.title, properties.code, declaration);
            }
            else if (
              !declaration ||
              // Allow Example = () => {...}
              declaration.type === 'ExpressionStatement' && !(
                declaration.expression.type === 'AssignmentExpression' &&
                declaration.expression.right.body &&
                declaration.expression.right.body.type === 'BlockStatement'
              )
            ) {
              file.message(`Example "${node.title}" must be a class, named block statement, or plain JSX`, node.position);
            }
          }
          catch (err) {
            file.message(`Example "${node.title}" has invalid JSX: ${err.toString()}`)
          }
        }

        return Object.assign({}, node, {
          type: 'element',
          tagName: 'Example',
          properties,
          children: all(h, node)
        });
      },
      import(h, node) {
        return Object.assign({}, node, {
          type: 'import'
        });
      },
      comment(h, node) {
        return Object.assign({}, node, {
          type: 'comment'
        });
      },
      image(h, node) {
        return imageHandler(h, node);
      },
      link(h, node) {
        const href = normalize(node.href || node.url);

        const properties = {};
        if (node.title !== null && node.title !== undefined) {
          properties.title = node.title;
        }
  
        if (href) {
          properties.to = href;
          
          return Object.assign({}, node, {
            type: 'element',
            tagName: 'PatternflyThemeLink',
            properties,
            children: all(h, node)
          });
        }
  
        properties.href = href;
        return h(node, 'a', properties, all(h, node));
      },
      mdxBlockElement(h, node) {
        return mdxExpression(h, node);
      },
      mdxSpanElement(h, node) {
        return mdxExpression(h, node);
      },
      mdxBlockExpression(h, node) {
        return Object.assign({}, node, {
          type: 'mdxBlockExpression'
        });
      },
      mdxSpanExpression(h, node) {
        return Object.assign({}, node, {
          type: 'mdxSpanExpression'
        });
      }
    };

    const hast = toHAST(tree, { handlers });

    hast.children.unshift(...srcImports);

    return hast;
  }
}

module.exports = mdxAstToMdxHast
