const generatedRoutes = require('./generated');
const { makeSlug } = require('theme-patternfly-org/helpers/slugger');
const { lazy } = require('react');

const routes = {
  '/': {
    Component: () => import(/* webpackChunkName: "home" */ './pages/home'),
  },
  '/get-in-touch': {
    Component: () => import(/* webpackChunkName: "get-in-touch" */ './pages/get-in-touch'),
    title: 'Get in touch'
  },
  '/404': {
    Component: () => import(/* webpackChunkName: "404" */ 'theme-patternfly-org/pages/404'),
    title: '404 Error'
  },
  ...generatedRoutes
};

for (let route in routes) {
  const pageData = routes[route];
  pageData.Component = lazy(pageData.Component);
}

// Group routes by section, id
const groupedRoutes = Object.entries(routes)
  .filter(([_slug, { id, section }]) => id && section)
  .reduce((accum, [slug, pageData]) => {
    const { section, id, source } = pageData;
    accum[section] = accum[section] || {};
    accum[section][id] = accum[section][id] || {
      id,
      designSnippet: null,
      slug: makeSlug(source, section, id, true),
      sources: {}
    };

    pageData.slug = slug;
    if (source === 'design-snippets') {
      accum[section][id].designSnippet = pageData;
    }
    else {
      accum[section][id].sources[source] = pageData;
    }

    return accum;
  }, {});

Object.entries(groupedRoutes)
  .forEach(([_section, ids]) => {
    Object.entries(ids).forEach(([_id, pageData]) => {
      const { designSnippet, slug, sources } = pageData;
      // Remove source routes for `app.js`
      Object.entries(sources).forEach(([_source, { slug }]) => {
        delete routes[slug];
      });
      // Add grouped route
      routes[slug] = pageData;
      // Remove route for design-snippets
      if (designSnippet) {
        delete routes[designSnippet.slug];
      }
    })
  });

// This module is shared between NodeJS and babelled ES5
module.exports = {
  routes,
  groupedRoutes
};
