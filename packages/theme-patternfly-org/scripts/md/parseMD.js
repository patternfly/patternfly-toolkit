const path = require('path');
const fs = require('fs-extra');
const unified = require('unified');
const remove = require('unist-util-remove');
const visit = require('unist-util-visit');
const toVfile = require('to-vfile'); // https://github.com/vfile/vfile
const vfileReport = require('vfile-reporter');
const yaml = require('js-yaml'); // https://github.com/nodeca/js-yaml
const { makeSlug } = require('../../helpers/slugger');
const { liveCodeTypes } = require('../../helpers/liveCodeTypes');
const { tsDocgen } = require('../tsDocgen');
const { sync } = require('glob');
const chokidar = require('chokidar');

let exitCode = 0;
const outputBase = path.join(process.cwd(), `src/generated`);
const tsDocs = {};
const routes = {};
const globs = {
  props: [],
  md: [],
  // [mdFile]: { source, files[] }
  mdExternal: {}
};

function toReactComponent(mdFilePath, source) {
  // vfiles allow for nicer error messages and have native `unified` support
  const vfile = toVfile.readSync(mdFilePath);

  const relPath = path.relative(path.join(process.cwd(), '../..'), vfile.path);

  let jsx;
  let outPath;
  let pageData = {};
  let frontmatter = {};

  unified()
    .use(require('remark-parse'))
    .use(require('remark-frontmatter'), ['yaml'])
    // Extract frontmatter
    .use(() => (tree, file) => {
      const yamlNode = tree.children.shift();
      if (!yamlNode) {
        return file.info('no frontmatter, skipping');
      }
      frontmatter = yaml.safeLoad(yamlNode.value);

      // Fail early
      if (!frontmatter.id) {
        file.fail('id attribute is required in frontmatter for PatternFly docs');
      }
      source = frontmatter.source || source;
      const slug = makeSlug(source, frontmatter.section, frontmatter.id);
      outPath = path.join(outputBase, `${slug}.js`);

      let sourceRepo = 'patternfly-org';
      if (source.includes('html')) {
        sourceRepo = 'patternfly';
      }
      else if (source.includes('react')) {
        sourceRepo = 'patternfly-react';
      }

      const propComponents = [...new Set(frontmatter.propComponents || [])]
        .filter(propComponent => {
          if (tsDocs[propComponent]) {
            return true;
          }
          file.message(`Prop component ${propComponent} missing from tsDocgen`);
          return false;
        })
        .map(propComponent => tsDocs[propComponent])

      const normalizedPath = relPath
        .replace('node_modules/@patternfly/patternfly/docs', 'src/patternfly')
        .replace(/node_modules\/@patternfly\/react-([\w-])/, (_, match) => `packages/react-${match}`)
        .replace(/\.\.\//g, '');

      pageData = {
        id: frontmatter.id,
        section: frontmatter.section || '',
        source,
        slug,
        sourceLink: `https://github.com/patternfly/${
          sourceRepo}/blob/main/${
          normalizedPath}`,
        hideTOC: frontmatter.hideTOC || false
      };
      // Temporarily override section for Demo tabs until we port this upstream
      if (frontmatter.section === 'demos' && routes[slug.replace('demos', 'components')]) {
        // Temporarily override section until https://github.com/patternfly/patternfly-react/pull/4862 is in react-docs
        pageData.section = 'components';
        pageData.source = `${source}-demos`;
        pageData.slug = makeSlug(pageData.source, pageData.section, pageData.id);
        outPath = path.join(outputBase, `${pageData.slug}.js`);
      }
      if (frontmatter.title) {
        pageData.title = frontmatter.title;
      }
      if (propComponents.length > 0) {
        pageData.propComponents = propComponents;
      }
      if (frontmatter.optIn) {
        pageData.optIn = frontmatter.optIn;
      }
      if (frontmatter.beta) {
        pageData.beta = frontmatter.beta;
      }
      if (frontmatter.cssPrefix) {
        pageData.cssPrefix = Array.isArray(frontmatter.cssPrefix)
          ? frontmatter.cssPrefix
          : [frontmatter.cssPrefix];
      }
      if (frontmatter.katacodaBroken) {
        pageData.katacodaBroken = frontmatter.katacodaBroken;
      }
      if (frontmatter.katacodaLayout) {
        pageData.katacodaLayout = frontmatter.katacodaLayout;
      }
      if (frontmatter.hideNavItem) {
        pageData.hideNavItem = frontmatter.hideNavItem;
      }
    })
    // Delete HTML comments
    .use(require('./remove-comments'))
    // remark-mdx removes auto-link support
    // this adds it back ONLY for links which are easily differentiable from JSX 
    .use(require('./auto-link-url'))
    // Support for JSX in MD
    .use(require('remark-mdx'))
    // remark-mdx leaves paragraphs as normal MD, but inside MDX we expect it not to.
    .use(() => tree => {
      visit(tree, 'mdxBlockElement', node => {
        if (node.children[0] && node.children[0].type === 'paragraph') {
          const newChildren = node.children[0].children;
          node.children.shift();
          node.children = newChildren.concat(node.children);
        }
      });
    })
    // Support for import/exports in MD
    .use(require('remark-mdxjs'))
    // Insert footnotes
    .use(require('remark-footnotes'))
    // Remove whitespace
    .use(require('remark-squeeze-paragraphs'))
    // Support example captions
    .use(require('./example-captions'))
    // .use(require('remark-rehype'))
    // .use(require('rehype-react'), { createElement: require('react').createElement })
    // Transform AST to JSX elements. Includes special code block parsing
    .use(require('./mdx-ast-to-mdx-hast'), { mdExternal: globs.mdExternal, source })
    // Don't allow exports
    .use(() => tree => remove(tree, 'export'))
    // Comments aren't very useful in generated files no one wants to look at
    .use(() => tree => remove(tree, 'comment'))
    // Extract examples to create fullscreen page routes
    // Needs to be run after mdx-ast-to-mdx-hast which parses meta properties
    .use(() => tree => {
      const isExample = node =>
        node.type === 'element'
        && node.tagName === 'Example'
        && liveCodeTypes.includes(node.properties.lang)
        && !node.properties.noLive;
      visit(tree, isExample, node => {
        if (node.properties.isFullscreen) {
          pageData.fullscreenExamples = pageData.fullscreenExamples || [];
          pageData.fullscreenExamples.push(node.title);
        }
        else {
          pageData.examples = pageData.examples || [];
          pageData.examples.push(node.title);
        }
      });
    })
    // Add custom PatternFly doc design things
    .use(require('./anchor-header'), toc => {
      if (!pageData.hideTOC && toc.length > 0) {
        pageData.toc = toc;
      }
      delete pageData.hideTOC;
    })
    .use(require('./styled-tags'))
    // Transform HAST object to JSX string
    .use(require('./mdx-hast-to-jsx'), {
      getOutPath: () => outPath,
      getRelPath: () => path.relative(path.dirname(outPath), vfile.dirname), // for imports
      getPageData: () => pageData // For @reach/router routing
    })
    .process(vfile, (err, file) => {
      if (err) {
        console.error(vfileReport(err));
        exitCode = 2;
      } else {
        // console.log(relPath, '->', path.relative(process.cwd(), outPath));
        if (file.messages.length > 0) {
          console.log(vfileReport(file));
        }
        jsx = file.contents;
      }
    });

  return {
    jsx,
    pageData,
    outPath
  };
}

function sourcePropsFile(file) {
  tsDocgen(file)
    .filter(({ hide }) => !hide)
    .forEach(({ name, description, props }) => {
      tsDocs[name] = { name, description, props };
    });
}

function sourceMDFile(file, source) {
  if (path.basename(file).startsWith('_')) {
    return;
  }
  const { jsx, pageData, outPath } = toReactComponent(file, source);

  if (jsx) {
    fs.outputFileSync(outPath, jsx);
    routes[pageData.slug] = {
      id: pageData.id,
      title: pageData.title || pageData.id,
      toc: pageData.toc || [],
      ...(pageData.examples && { examples: pageData.examples }),
      ...(pageData.fullscreenExamples && { fullscreenExamples: pageData.fullscreenExamples }),
      section: pageData.section,
      source: pageData.source,
      ...(pageData.katacodaLayout && { katacodaLayout: pageData.katacodaLayout }),
      ...(pageData.hideNavItem && { hideNavItem: pageData.hideNavItem })
    };
  }
}

function writeIndex() {
  const stringifyRoute = ([route, pageData]) => `'${route}': {\n    ${Object.entries(pageData)
    .map(([key, val]) => `${key}: ${JSON.stringify(val)}`)
    .concat(`Component: () => import(/* webpackChunkName: "${route.substr(1)}/index" */ '.${route}')`)
    .join(',\n    ')}\n  }`;

  const indexContent = `module.exports = {\n  ${Object.entries(routes)
    .map(stringifyRoute)
    .join(',\n  ')}\n};`;
  fs.outputFileSync(path.join(outputBase, 'index.js'), indexContent);

  return exitCode;
}

module.exports = {
  sourceProps(glob, ignore) {
    globs.props.push({ glob, ignore });
    sync(glob, { ignore }).forEach(sourcePropsFile);
  },
  sourceMD(glob, source, ignore) {
    globs.md.push({ glob, source, ignore });
    sync(glob, { ignore }).forEach(file => sourceMDFile(file, source));
  },
  writeIndex,
  watchMD() {
    globs.props.forEach(({ glob, ignore }) => {
      const propWatcher = chokidar.watch(glob, { ignored: ignore, ignoreInitial: true });
      propWatcher.on('add', sourcePropsFile);
      propWatcher.on('change', sourcePropsFile);
    });
    globs.md.forEach(({ glob, source, ignore }) => {
      const mdWatcher = chokidar.watch(glob, { ignored: ignore, ignoreInitial: true });
      function onMDFileChange(file) {
        sourceMDFile(file, source);
        writeIndex();
      }
      mdWatcher.on('add', onMDFileChange);
      mdWatcher.on('change', onMDFileChange);
    });
    Object.entries(globs.mdExternal).forEach(([key, { source, files }]) => {
      files.forEach(file => {
        const watcher = chokidar.watch(file, { ignoreInitial: true });
        watcher.on('change', () => {
          sourceMDFile(key, source);
          writeIndex();
        });
      });
    });
  }
};
