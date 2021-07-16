// This module is shared between NodeJS and babelled ES5
module.exports = {
  pathPrefix: '/v4',
  googleAnalyticsID: 'UA-47523816-6',
  algolia: {
    apiKey: '06941733239da4f8617d272cf2ed4d5c',
    indexName: 'patternfly'
  },
  hasGdprBanner: true,
  hasFooter: true,
  hasVersionSwitcher: true,
  hasDesignGuidelines: true,
  sideNavItems: [
    { section: 'get-started' },
    { section: 'developer-resources' },
    { section: 'accessibility' },
    { section: 'guidelines' },
    { section: 'UX writing' },
    { section: 'components' },
    { section: 'extensions' },
    { section: 'charts' },
    { section: 'demos' },
    { section: 'layouts' },
    { section: 'utilities' },
    { section: 'contribute' },
    { section: 'training' },
    { href: '/community' }
  ],
  topNavItems: [],
  port: 8003,
};
