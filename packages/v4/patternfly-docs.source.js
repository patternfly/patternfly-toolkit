const path = require('path');

module.exports = (sourceMD, sourceProps) => {
  // Content md
  const contentBase = path.join(__dirname, 'src/content');
  sourceMD(path.join(contentBase, 'contribute/**/*.md'), 'pages-contribute');
  sourceMD(path.join(contentBase, 'get-started/**/*.md'), 'pages-get-started');
  sourceMD(path.join(contentBase, 'developer-resources/**/*.md'), 'developer-resources');
  sourceMD(path.join(contentBase, 'accessibility/**/*.md'), 'accessibility');
  sourceMD(path.join(contentBase, 'community/**/*.md'), 'community');
  sourceMD(path.join(contentBase, 'design-guidelines/**/*.md'), 'design-guidelines');
  sourceMD(path.join(contentBase, 'training/**/*.md'), 'training');
  sourceMD(path.join(contentBase, 'extensions/**/*.md'), 'extensions');

  // Theme pages
  const themePagesPath = require
    .resolve('theme-patternfly-org/package.json')
    .replace('package.json', 'pages');
  sourceMD(path.join(themePagesPath, '*.md'), 'pages-overview');

  // Core MD
  const coreDocsPath = require
    .resolve('@patternfly/patternfly/package.json')
    .replace('package.json', 'docs');
  const coreDocsIgnore = path.join(coreDocsPath, '/pages/**'); // Compatibility for old gatsby workspace
  sourceMD(path.join(coreDocsPath, '!(demos)/**/examples/**/*.md'), 'html', coreDocsIgnore);
  sourceMD(path.join(coreDocsPath, 'demos/**/*.md'), 'html-demos', coreDocsIgnore);

  // React props
  const reactCorePath = require
    .resolve('@patternfly/react-core/package.json')
    .replace('package.json', 'src');
  const reactTablePath = require
    .resolve('@patternfly/react-table/package.json')
    .replace('package.json', 'src');
  const reactCodeEditorPath = require
    .resolve('@patternfly/react-code-editor/package.json')
    .replace('package.json', 'src');
  const reactChartsPath = require
      .resolve('@patternfly/react-charts/package.json')
      .replace('package.json', 'src');
  const reactLogViewerPath = require
      .resolve('@patternfly/react-log-viewer/package.json')
      .replace('package.json', 'src');

  const reactPropsIgnore = '**/*.test.tsx';
  sourceProps(path.join(reactCorePath, '/**/*.tsx'), reactPropsIgnore);
  sourceProps(path.join(reactTablePath, '/**/*.tsx'), reactPropsIgnore);
  sourceProps(path.join(reactCodeEditorPath, '/**/*.tsx'),reactPropsIgnore);
  sourceProps(path.join(reactChartsPath, '/**/*.tsx'),reactPropsIgnore);
  sourceProps(path.join(reactLogViewerPath, '/**/*.tsx'), reactPropsIgnore);

  // React MD
  sourceMD(path.join(reactCorePath, '/**/examples/*.md'), 'react');
  sourceMD(path.join(reactCorePath, '/**/demos/**/*.md'), 'react-demos');

  // React-table MD
  sourceMD(path.join(reactTablePath, '/**/examples/*.md'), 'react');
  sourceMD(path.join(reactTablePath, '/**/demos/*.md'), 'react-demos');
  
  // Charts MD (no demos yet)
  sourceMD(path.join(reactChartsPath, '/**/examples/*.md'), 'react');

  // React-code-editor MD
  sourceMD(path.join(reactCodeEditorPath, '/**/examples/*.md'), 'react');

  // React-log-viewer MD
  sourceMD(path.join(reactLogViewerPath, '/**/examples/*.md'), 'react');

  // Release notes
  sourceMD(require.resolve('@patternfly/patternfly/RELEASE-NOTES.md'), 'html');
  sourceMD(require.resolve('@patternfly/react-docs/RELEASE-NOTES.md'), 'react');

  // Upgrade guides
  sourceMD(require.resolve('@patternfly/patternfly/UPGRADE-GUIDE.md'), 'html');
  sourceMD(require.resolve('@patternfly/react-docs/UPGRADE-GUIDE.md'), 'react');
}
