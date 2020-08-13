import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from 'theme-patternfly-org/components';


export const DocumentationDemosDrawerCoreDocs = {
  "slug": "/documentation/demos/drawer/core",
  "source": "core",
  "sourceLink": "https://github.com/patternfly/patternfly/blob/master/src/patternfly/demos/Drawer/examples/Drawer.md",
  "section": "demos",
  "id": "Drawer",
  "title": "Drawer",
  "toc": [
    "Demos",
    "Documentation"
  ]
};
DocumentationDemosDrawerCoreDocs.liveContext = {
  
};
DocumentationDemosDrawerCoreDocs.Component = () => (
  <React.Fragment>
    <AutoLinkHeader {...{"size":"h2","className":"ws-title ws-h2"}}>
      {`Demos`}
    </AutoLinkHeader>
    <Example {...DocumentationDemosDrawerCoreDocs} {...{"code":"<div class=\"pf-c-page\" id=\"drawer-collapsed-demo\">\n  <a class=\"pf-c-skip-to-content pf-c-button pf-m-primary\" href=\"#main-content-drawer-collapsed-demo\">Skip to content</a>\n  <header class=\"pf-c-page__header\">\n    <div class=\"pf-c-page__header-brand\">\n      <div class=\"pf-c-page__header-brand-toggle\">\n        <button class=\"pf-c-button pf-m-plain\" type=\"button\" id=\"drawer-collapsed-demo-nav-toggle\" aria-label=\"Global navigation\" aria-expanded=\"true\" aria-controls=\"drawer-collapsed-demo-primary-nav\">\n          <i class=\"fas fa-bars\" aria-hidden=\"true\"></i>\n        </button>\n      </div>\n      <a class=\"pf-c-page__header-brand-link\">\n        <img class=\"pf-c-brand\" src=\"/assets/images/PF-Masthead-Logo.svg\" alt=\"PatternFly logo\" />\n      </a>\n    </div>\n    <div class=\"pf-c-page__header-tools\">\n      <div class=\"pf-c-page__header-tools-group\">\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden pf-m-visible-on-lg\">\n          <button class=\"pf-c-button pf-m-plain\" type=\"button\" aria-label=\"Unread notifications\" aria-expanded=\"false\">\n            <span class=\"pf-c-notification-badge pf-m-unread\">\n              <i class=\"fas fa-bell\" aria-hidden=\"true\"></i>\n            </span>\n          </button>\n        </div>\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden pf-m-visible-on-lg\">\n          <button class=\"pf-c-button pf-m-plain\" type=\"button\" aria-label=\"Settings\">\n            <i class=\"fas fa-cog\" aria-hidden=\"true\"></i>\n          </button>\n        </div>\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden pf-m-visible-on-lg\">\n          <button class=\"pf-c-button pf-m-plain\" type=\"button\" aria-label=\"Help\">\n            <i class=\"pf-icon pf-icon-help\" aria-hidden=\"true\"></i>\n          </button>\n        </div>\n      </div>\n      <div class=\"pf-c-page__header-tools-group\">\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden-on-lg\">\n          <button class=\"pf-c-button pf-m-plain\" type=\"button\" aria-label=\"Unread notifications\" aria-expanded=\"false\">\n            <span class=\"pf-c-notification-badge pf-m-unread\">\n              <i class=\"fas fa-bell\" aria-hidden=\"true\"></i>\n            </span>\n          </button>\n        </div>\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden-on-lg\">\n          <div class=\"pf-c-dropdown\">\n            <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"drawer-collapsed-demo-dropdown-kebab-right-aligned-1-button\" aria-expanded=\"false\" aria-label=\"Actions\">\n              <i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>\n            </button>\n            <ul class=\"pf-c-dropdown__menu pf-m-align-right\" aria-labelledby=\"drawer-collapsed-demo-dropdown-kebab-right-aligned-1-button\" hidden>\n              <li>\n                <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Link</a>\n              </li>\n              <li>\n                <button class=\"pf-c-dropdown__menu-item\" type=\"button\">Action</button>\n              </li>\n              <li>\n                <a class=\"pf-c-dropdown__menu-item pf-m-disabled\" href=\"#\" aria-disabled=\"true\" tabindex=\"-1\">Disabled link</a>\n              </li>\n              <li>\n                <button class=\"pf-c-dropdown__menu-item\" type=\"button\" disabled>Disabled action</button>\n              </li>\n              <li class=\"pf-c-divider\" role=\"separator\"></li>\n              <li>\n                <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Separated link</a>\n              </li>\n            </ul>\n          </div>\n        </div>\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden pf-m-visible-on-md\">\n          <div class=\"pf-c-dropdown\">\n            <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"drawer-collapsed-demo-dropdown-button\" aria-expanded=\"false\">\n              <span class=\"pf-c-dropdown__toggle-text\">John Smith</span>\n              <span class=\"pf-c-dropdown__toggle-icon\">\n                <i class=\"fas fa-caret-down\" aria-hidden=\"true\"></i>\n              </span>\n            </button>\n            <div class=\"pf-c-dropdown__menu\" hidden>[Panel contents here]</div>\n          </div>\n        </div>\n      </div>\n      <img class=\"pf-c-avatar\" src=\"/assets/images/img_avatar.svg\" alt=\"Avatar image\" />\n    </div>\n  </header>\n  <div class=\"pf-c-page__sidebar\">\n    <div class=\"pf-c-page__sidebar-body\">\n      <nav class=\"pf-c-nav\" id=\"drawer-collapsed-demo-primary-nav\" aria-label=\"Global\">\n        <ul class=\"pf-c-nav__list\">\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link pf-m-current\" aria-current=\"page\">System panel</a>\n          </li>\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link\">Policy</a>\n          </li>\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link\">Authentication</a>\n          </li>\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link\">Network services</a>\n          </li>\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link\">Server</a>\n          </li>\n        </ul>\n      </nav>\n    </div>\n  </div>\n  <div class=\"pf-c-page__drawer\">\n    <div class=\"pf-c-drawer\">\n      <div class=\"pf-c-drawer__main\">\n        <div class=\"pf-c-drawer__content\">\n          <div class=\"pf-c-drawer__body\">\n            <main class=\"pf-c-page__main\" tabindex=\"-1\">\n              <section class=\"pf-c-page__main-breadcrumb\">\n                <nav class=\"pf-c-breadcrumb\" aria-label=\"breadcrumb\">\n                  <ol class=\"pf-c-breadcrumb__list\">\n                    <li class=\"pf-c-breadcrumb__item\">\n                      <a href=\"#\" class=\"pf-c-breadcrumb__link\">Section home</a>\n                    </li>\n                    <li class=\"pf-c-breadcrumb__item\">\n                      <span class=\"pf-c-breadcrumb__item-divider\">\n                        <i class=\"fas fa-angle-right\" aria-hidden=\"true\"></i>\n                      </span>\n                      <a href=\"#\" class=\"pf-c-breadcrumb__link\">Section title</a>\n                    </li>\n                    <li class=\"pf-c-breadcrumb__item\">\n                      <span class=\"pf-c-breadcrumb__item-divider\">\n                        <i class=\"fas fa-angle-right\" aria-hidden=\"true\"></i>\n                      </span>\n                      <a href=\"#\" class=\"pf-c-breadcrumb__link\">Section title</a>\n                    </li>\n                    <li class=\"pf-c-breadcrumb__item\">\n                      <span class=\"pf-c-breadcrumb__item-divider\">\n                        <i class=\"fas fa-angle-right\" aria-hidden=\"true\"></i>\n                      </span>\n                      <a href=\"#\" class=\"pf-c-breadcrumb__link pf-m-current\" aria-current=\"page\">Section landing</a>\n                    </li>\n                  </ol>\n                </nav>\n              </section>\n              <section class=\"pf-c-page__main-section pf-m-light\">\n                <div class=\"pf-c-content\">\n                  <h1>Main title</h1>\n                  <p>This is a demo of the Page component.</p>\n                </div>\n              </section>\n              <section class=\"pf-c-page__main-section\">\n                <div class=\"pf-l-gallery pf-m-gutter\">\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                </div>\n              </section>\n            </main>\n          </div>\n        </div>\n        <div class=\"pf-c-drawer__panel pf-m-width-33\" hidden>\n          <div class=\"pf-c-drawer__body\">\n            <p>drawer panel</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>","title":"Collapsed","lang":"html","isFullscreen":true}}>
    </Example>
    <Example {...DocumentationDemosDrawerCoreDocs} {...{"code":"<div class=\"pf-c-page\" id=\"drawer-expanded-demo\">\n  <a class=\"pf-c-skip-to-content pf-c-button pf-m-primary\" href=\"#main-content-drawer-expanded-demo\">Skip to content</a>\n  <header class=\"pf-c-page__header\">\n    <div class=\"pf-c-page__header-brand\">\n      <div class=\"pf-c-page__header-brand-toggle\">\n        <button class=\"pf-c-button pf-m-plain\" type=\"button\" id=\"drawer-expanded-demo-nav-toggle\" aria-label=\"Global navigation\" aria-expanded=\"true\" aria-controls=\"drawer-expanded-demo-primary-nav\">\n          <i class=\"fas fa-bars\" aria-hidden=\"true\"></i>\n        </button>\n      </div>\n      <a class=\"pf-c-page__header-brand-link\">\n        <img class=\"pf-c-brand\" src=\"/assets/images/PF-Masthead-Logo.svg\" alt=\"PatternFly logo\" />\n      </a>\n    </div>\n    <div class=\"pf-c-page__header-tools\">\n      <div class=\"pf-c-page__header-tools-group\">\n        <div class=\"pf-c-page__header-tools-item pf-m-selected pf-m-hidden pf-m-visible-on-lg\">\n          <button class=\"pf-c-button pf-m-plain\" type=\"button\" aria-label=\"Unread notifications\" aria-expanded=\"true\">\n            <span class=\"pf-c-notification-badge pf-m-unread\">\n              <i class=\"fas fa-bell\" aria-hidden=\"true\"></i>\n            </span>\n          </button>\n        </div>\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden pf-m-visible-on-lg\">\n          <button class=\"pf-c-button pf-m-plain\" type=\"button\" aria-label=\"Settings\">\n            <i class=\"fas fa-cog\" aria-hidden=\"true\"></i>\n          </button>\n        </div>\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden pf-m-visible-on-lg\">\n          <button class=\"pf-c-button pf-m-plain\" type=\"button\" aria-label=\"Help\">\n            <i class=\"pf-icon pf-icon-help\" aria-hidden=\"true\"></i>\n          </button>\n        </div>\n      </div>\n      <div class=\"pf-c-page__header-tools-group\">\n        <div class=\"pf-c-page__header-tools-item pf-m-selected pf-m-hidden-on-lg\">\n          <button class=\"pf-c-button pf-m-plain\" type=\"button\" aria-label=\"Unread notifications\" aria-expanded=\"true\">\n            <span class=\"pf-c-notification-badge pf-m-unread\">\n              <i class=\"fas fa-bell\" aria-hidden=\"true\"></i>\n            </span>\n          </button>\n        </div>\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden-on-lg\">\n          <div class=\"pf-c-dropdown\">\n            <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"drawer-expanded-demo-dropdown-kebab-right-aligned-1-button\" aria-expanded=\"false\" aria-label=\"Actions\">\n              <i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>\n            </button>\n            <ul class=\"pf-c-dropdown__menu pf-m-align-right\" aria-labelledby=\"drawer-expanded-demo-dropdown-kebab-right-aligned-1-button\" hidden>\n              <li>\n                <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Link</a>\n              </li>\n              <li>\n                <button class=\"pf-c-dropdown__menu-item\" type=\"button\">Action</button>\n              </li>\n              <li>\n                <a class=\"pf-c-dropdown__menu-item pf-m-disabled\" href=\"#\" aria-disabled=\"true\" tabindex=\"-1\">Disabled link</a>\n              </li>\n              <li>\n                <button class=\"pf-c-dropdown__menu-item\" type=\"button\" disabled>Disabled action</button>\n              </li>\n              <li class=\"pf-c-divider\" role=\"separator\"></li>\n              <li>\n                <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Separated link</a>\n              </li>\n            </ul>\n          </div>\n        </div>\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden pf-m-visible-on-md\">\n          <div class=\"pf-c-dropdown\">\n            <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"drawer-expanded-demo-dropdown-button\" aria-expanded=\"false\">\n              <span class=\"pf-c-dropdown__toggle-text\">John Smith</span>\n              <span class=\"pf-c-dropdown__toggle-icon\">\n                <i class=\"fas fa-caret-down\" aria-hidden=\"true\"></i>\n              </span>\n            </button>\n            <div class=\"pf-c-dropdown__menu\" hidden>[Panel contents here]</div>\n          </div>\n        </div>\n      </div>\n      <img class=\"pf-c-avatar\" src=\"/assets/images/img_avatar.svg\" alt=\"Avatar image\" />\n    </div>\n  </header>\n  <div class=\"pf-c-page__sidebar\">\n    <div class=\"pf-c-page__sidebar-body\">\n      <nav class=\"pf-c-nav\" id=\"drawer-expanded-demo-primary-nav\" aria-label=\"Global\">\n        <ul class=\"pf-c-nav__list\">\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link pf-m-current\" aria-current=\"page\">System panel</a>\n          </li>\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link\">Policy</a>\n          </li>\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link\">Authentication</a>\n          </li>\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link\">Network services</a>\n          </li>\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link\">Server</a>\n          </li>\n        </ul>\n      </nav>\n    </div>\n  </div>\n  <div class=\"pf-c-page__drawer\">\n    <div class=\"pf-c-drawer pf-m-expanded\">\n      <div class=\"pf-c-drawer__main\">\n        <div class=\"pf-c-drawer__content\">\n          <div class=\"pf-c-drawer__body\">\n            <main class=\"pf-c-page__main\" tabindex=\"-1\">\n              <section class=\"pf-c-page__main-breadcrumb\">\n                <nav class=\"pf-c-breadcrumb\" aria-label=\"breadcrumb\">\n                  <ol class=\"pf-c-breadcrumb__list\">\n                    <li class=\"pf-c-breadcrumb__item\">\n                      <a href=\"#\" class=\"pf-c-breadcrumb__link\">Section home</a>\n                    </li>\n                    <li class=\"pf-c-breadcrumb__item\">\n                      <span class=\"pf-c-breadcrumb__item-divider\">\n                        <i class=\"fas fa-angle-right\" aria-hidden=\"true\"></i>\n                      </span>\n                      <a href=\"#\" class=\"pf-c-breadcrumb__link\">Section title</a>\n                    </li>\n                    <li class=\"pf-c-breadcrumb__item\">\n                      <span class=\"pf-c-breadcrumb__item-divider\">\n                        <i class=\"fas fa-angle-right\" aria-hidden=\"true\"></i>\n                      </span>\n                      <a href=\"#\" class=\"pf-c-breadcrumb__link\">Section title</a>\n                    </li>\n                    <li class=\"pf-c-breadcrumb__item\">\n                      <span class=\"pf-c-breadcrumb__item-divider\">\n                        <i class=\"fas fa-angle-right\" aria-hidden=\"true\"></i>\n                      </span>\n                      <a href=\"#\" class=\"pf-c-breadcrumb__link pf-m-current\" aria-current=\"page\">Section landing</a>\n                    </li>\n                  </ol>\n                </nav>\n              </section>\n              <section class=\"pf-c-page__main-section pf-m-light\">\n                <div class=\"pf-c-content\">\n                  <h1>Main title</h1>\n                  <p>This is a demo of the Page component.</p>\n                </div>\n              </section>\n              <section class=\"pf-c-page__main-section\">\n                <div class=\"pf-l-gallery pf-m-gutter\">\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                  <div class=\"pf-l-gallery__item\">\n                    <div class=\"pf-c-card\">\n                      <div class=\"pf-c-card__body\">This is a card</div>\n                    </div>\n                  </div>\n                </div>\n              </section>\n            </main>\n          </div>\n        </div>\n        <div class=\"pf-c-drawer__panel pf-m-width-33\">\n          <div class=\"pf-c-drawer__body\">\n            <p>drawer panel</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>","title":"Expanded","lang":"html","isFullscreen":true}}>
    </Example>
    <AutoLinkHeader {...{"size":"h2","className":"ws-title ws-h2"}}>
      {`Documentation`}
    </AutoLinkHeader>
    <p {...{"className":"ws-p"}}>
      {`This demo implements the drawer in context of the page component.`}
    </p>
  </React.Fragment>
);
DocumentationDemosDrawerCoreDocs.Component.displayName = 'DocumentationDemosDrawerCoreDocs';
