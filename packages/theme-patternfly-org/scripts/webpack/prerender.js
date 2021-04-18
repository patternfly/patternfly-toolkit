const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { ServerLocation } = require('@reach/router');
const ssrPrepass = require('react-ssr-prepass');
// react, react-dom, and @reach/router are all EXCLUDED from the ssr-bundle.js
// The versions imported above are used instead, which allows us to use <ServerLocation>

// This function is effectively synchronous because it mutates global.setTimeout
// Only allow one copy at a time to run
async function prerender(url, pathPrefix) {
  url = `${pathPrefix}${url}`;
  const location = { pathname: url };
  // For @reach/router
  global.history = {};
  global.location = location 
  global.window = {
    location,
    // For virtualized-edit-extension
    getBoundingClientRect: () => ({
      height: 0,
      width: 0
    })
  };
  // For monaco
  global.navigator = {
    userAgent: '',
    maxTouchPoints: 1
  };
  global.document = {
    queryCommandSupported: () => true,
    // For react-consoles
    createElementNS: () => ({
      download: {}
    })
  };
  global.self = {
    // For react-console
    document: global.document
  };

  console.log('prender', url);
  const { App } = require(`${process.cwd()}/.cache/ssr-build/main`);
  const WrappedApp = React.createElement(ServerLocation, { url },
    React.createElement(App)
  );
  await ssrPrepass(WrappedApp, element => {
    if (element.type.name === 'AsyncComponent') {
      return element.type.preload();
    }
  });
  const string = ReactDOMServer.renderToString(WrappedApp);

  return string;
}

module.exports = {
  prerender
};
