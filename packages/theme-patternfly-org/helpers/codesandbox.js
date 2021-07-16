const versions  = require('../versions.json');
const overpass = require('./fonts');
const { parse } = require('../helpers/acorn');
const { capitalize } = require('./capitalize');

const getStaticParams = (title, html) => {
  const imgAssetRegex = /['"](\/assets\/images\/.*)['"]/g;
  let imgAsset;
  while ((imgAsset = imgAssetRegex.exec(html))) {
    const imgName = imgAsset[1];
    html = html.replace(imgName, `https://www.patternfly.org/v4${imgName}`);
  }

  return {
    files: {
      'index.html': {
        content: `
          <!DOCTYPE html>
          <html lang="en" class="pf-m-redhat-font">
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="stylesheet" href="fonts.css" />
              <!-- Include latest PatternFly CSS via CDN -->
              <link 
                rel="stylesheet" 
                href="https://unpkg.com/@patternfly/patternfly/patternfly.css" 
                crossorigin="anonymous"
              >
              <link rel="stylesheet" href="style.css" />
              <title>PatternFly ${title} CodeSandbox Example</title>
            </head>
            <body>
              ${html}
            </body>
          </html>
        `,
      },
      'package.json': {
        content: {},
      },
      'style.css': {
        content: ''
      },
      'fonts.css': {
        content: overpass
      },
      'sandbox.config.json': {
        content: { template: 'static' }
      }
    },
    template: 'static',
  }
};

// Allow 4 formats for example identifiers
// 1. Example = () => { return <jsx />; }
// 2. class Example {}
// 3. function Example() { return <jsx />; }
// 4. const Example = () => { return <jsx />; }
const allowedIdentifiers = [
  'ClassDeclaration',
  'FunctionDeclaration',
  'ExpressionStatement',
  'VariableDeclaration'
];
function getExampleDeclaration(code) {
  code = code
    .replace(/export\s+default\s+/g, '')
    .replace(/export\s+/g, '');

  const { body } = parse(code);
  const lastParsed = body[body.length - 1];
  if (allowedIdentifiers.includes(lastParsed.type)) {
    return lastParsed;
  }
}

function getIdentifier(title) {
  return capitalize(
    title
      .replace(/^[^A-Za-z]/, '')
      .replace(/\s+([a-z])?/g, (_, match) => match ? capitalize(match) : '')
      .replace(/[^A-Za-z0-9_]/g, '')
  );
}

function prettyExampleCode(title, code, declaration, identifier) {
  // Create identifier from title
  const ident = identifier || getIdentifier(title);
  const jsxBlock = code.substring(declaration.start, declaration.end);
  if (identifier) {
    return code.replace(jsxBlock, `const ${jsxBlock}`);
  }
  if (jsxBlock.includes('\n')) {
    // Make pretty
    return code.replace(jsxBlock, `const ${ident} = () => (\n  ${
      jsxBlock
        .replace(/\n/g, '\n  ')
        .replace(/;[ \t]*$/, '')
      }\n)`);
  }
  else {
    return code.replace(jsxBlock, `const ${ident} = () => ${jsxBlock}`);
  }
}

// TODO: Make React examples work and use a template that has our assets.
function getReactParams(title, code, scope) {
  let toRender = null;
  try {
    let declaration = getExampleDeclaration(code);
    if (declaration.type === 'ExpressionStatement') {
      if (!declaration.expression.left) {
        // () => <jsx />
        code = prettyExampleCode(title, code, declaration);
        toRender = getIdentifier(title);
      } else if (declaration.expression.type === 'AssignmentExpression') {
        // Basic = () => <jsx />
        code = prettyExampleCode(title, code, declaration, declaration.expression.left.name);
        toRender = declaration.expression.left.name;
      }
    } else if (declaration.type === 'VariableDeclaration') {
      toRender = declaration.declarations[0].id.name;
    } else if (declaration.id) {
      toRender = declaration.id.name;
    }
  }
  catch (err) {
    // Ignore
  }

  const imgImportRegex = /import\s*(\w*).*['"](.*)(\.(png|jpe?g|webp|gif|svg))['"]/g;
  let imgImportMatch;
  while ((imgImportMatch = imgImportRegex.exec(code))) {
    const imgName = imgImportMatch[1];
    code = code.replace(imgImportMatch[0], `const ${imgName} = "https://www.patternfly.org/v4${scope[imgName]}"`);
  }

  const dependencies = {
    '@patternfly/react-core': versions.Releases[0].versions['@patternfly/react-core']
  };

  Object.entries(versions.Releases[0].versions)
    .filter(([pkg]) => code.includes(pkg))
    .forEach(([pkg, version]) => dependencies[pkg] = version);

  return {
    files: {
      'index.html': {
        content: `<!DOCTYPE html>
<html lang="en" class="pf-m-redhat-font">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>PatternFly-React ${title} CodeSandbox Example</title>
  </head>
<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root" style="height:100%"></div>
</body>
</html>`,
      },
      'index.js': {
        content: `import ReactDOM from 'react-dom';
import "@patternfly/react-core/dist/styles/base.css";
import './fonts.css';

${code}

const rootElement = document.getElementById("root");
ReactDOM.render(<${toRender} />, rootElement);`
      },
      'fonts.css': {
        content: overpass
      },
      'package.json': {
        content: {
          dependencies: {
            ...dependencies,
            'react': '^16.8.0',
            'react-dom': '^16.8.0'
          }
        },
      },
      'sandbox.config.json': {
        content: { template: 'create-react-app' }
      }
    },
  }
}

module.exports = {
  getReactParams,
  getStaticParams,
  getExampleDeclaration,
  prettyExampleCode
};
