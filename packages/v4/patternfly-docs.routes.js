// This module is shared between NodeJS and babelled ES5
const isClient = Boolean(process.env.NODE_ENV);

module.exports = {
  '/': {
    SyncComponent: isClient && require('./src/pages/home').default
  },
  '/404': {
    SyncComponent: isClient && require('theme-patternfly-org/pages/404/index').default,
    title: '404 Error'
  }
};
