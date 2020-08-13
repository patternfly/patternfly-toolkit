import React from 'react';
import { AutoLinkHeader, Example, Link as PatternflyThemeLink } from 'theme-patternfly-org/components';


export const DocumentationDemosCardViewCoreDocs = {
  "slug": "/documentation/demos/card-view/core",
  "source": "core",
  "sourceLink": "https://github.com/patternfly/patternfly/blob/master/src/patternfly/demos/CardView/examples/CardView.md",
  "section": "demos",
  "id": "Card view",
  "title": "Card view",
  "toc": [
    "Demos"
  ]
};
DocumentationDemosCardViewCoreDocs.liveContext = {
  
};
DocumentationDemosCardViewCoreDocs.Component = () => (
  <React.Fragment>
    <AutoLinkHeader {...{"size":"h2","className":"ws-title ws-h2"}}>
      {`Demos`}
    </AutoLinkHeader>
    <Example {...DocumentationDemosCardViewCoreDocs} {...{"code":"<div class=\"pf-c-page\" id=\"card-view\">\n  <a class=\"pf-c-skip-to-content pf-c-button pf-m-primary\" href=\"#main-content-card-view\">Skip to content</a>\n  <header class=\"pf-c-page__header\">\n    <div class=\"pf-c-page__header-brand\">\n      <div class=\"pf-c-page__header-brand-toggle\">\n        <button class=\"pf-c-button pf-m-plain\" type=\"button\" id=\"card-view-nav-toggle\" aria-label=\"Global navigation\" aria-expanded=\"true\" aria-controls=\"card-view-primary-nav\">\n          <i class=\"fas fa-bars\" aria-hidden=\"true\"></i>\n        </button>\n      </div>\n      <a class=\"pf-c-page__header-brand-link\">\n        <img class=\"pf-c-brand\" src=\"/assets/images/PF-Masthead-Logo.svg\" alt=\"Patternfly Logo\" />\n      </a>\n    </div>\n    <div class=\"pf-c-page__header-tools\">\n      <div class=\"pf-c-page__header-tools-group\">\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden pf-m-visible-on-lg\">\n          <button class=\"pf-c-button pf-m-plain\" type=\"button\" aria-label=\"Settings\">\n            <i class=\"fas fa-cog\" aria-hidden=\"true\"></i>\n          </button>\n        </div>\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden pf-m-visible-on-lg\">\n          <button class=\"pf-c-button pf-m-plain\" type=\"button\" aria-label=\"Help\">\n            <i class=\"pf-icon pf-icon-help\" aria-hidden=\"true\"></i>\n          </button>\n        </div>\n      </div>\n      <div class=\"pf-c-page__header-tools-group\">\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden-on-lg\">\n          <div class=\"pf-c-dropdown\">\n            <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"card-view-dropdown-kebab-right-aligned-1-button\" aria-expanded=\"false\" aria-label=\"Actions\">\n              <i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>\n            </button>\n            <ul class=\"pf-c-dropdown__menu pf-m-align-right\" aria-labelledby=\"card-view-dropdown-kebab-right-aligned-1-button\" hidden>\n              <li>\n                <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Link</a>\n              </li>\n              <li>\n                <button class=\"pf-c-dropdown__menu-item\" type=\"button\">Action</button>\n              </li>\n              <li>\n                <a class=\"pf-c-dropdown__menu-item pf-m-disabled\" href=\"#\" aria-disabled=\"true\" tabindex=\"-1\">Disabled link</a>\n              </li>\n              <li>\n                <button class=\"pf-c-dropdown__menu-item\" type=\"button\" disabled>Disabled action</button>\n              </li>\n              <li class=\"pf-c-divider\" role=\"separator\"></li>\n              <li>\n                <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Separated link</a>\n              </li>\n            </ul>\n          </div>\n        </div>\n        <div class=\"pf-c-page__header-tools-item pf-m-hidden pf-m-visible-on-md\">\n          <div class=\"pf-c-dropdown\">\n            <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"card-view-dropdown-button\" aria-expanded=\"false\">\n              <span class=\"pf-c-dropdown__toggle-text\">John Smith</span>\n              <span class=\"pf-c-dropdown__toggle-icon\">\n                <i class=\"fas fa-caret-down\" aria-hidden=\"true\"></i>\n              </span>\n            </button>\n            <div class=\"pf-c-dropdown__menu\" hidden>[Panel contents here]</div>\n          </div>\n        </div>\n      </div>\n      <img class=\"pf-c-avatar\" src=\"/assets/images/img_avatar.svg\" alt=\"Avatar image\" />\n    </div>\n  </header>\n  <div class=\"pf-c-page__sidebar\">\n    <div class=\"pf-c-page__sidebar-body\">\n      <nav class=\"pf-c-nav\" id=\"card-view-primary-nav\" aria-label=\"Global\">\n        <ul class=\"pf-c-nav__list\">\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link pf-m-current\" aria-current=\"page\">System Panel</a>\n          </li>\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link\">Policy</a>\n          </li>\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link\">Authentication</a>\n          </li>\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link\">Network Services</a>\n          </li>\n          <li class=\"pf-c-nav__item\">\n            <a href=\"#\" class=\"pf-c-nav__link\">Server</a>\n          </li>\n        </ul>\n      </nav>\n    </div>\n  </div>\n  <main class=\"pf-c-page__main\" tabindex=\"-1\" id=\"main-content-card-view\">\n    <section class=\"pf-c-page__main-section pf-m-light\">\n      <div class=\"pf-c-content\">\n        <h1>Projects</h1>\n        <p>This is a demo that showcases Patternfly Cards.</p>\n      </div>\n    </section>\n    <section class=\"pf-c-page__main-section\">\n      <div class=\"pf-l-gallery pf-m-gutter\">\n        <div class=\"pf-c-card pf-m-hoverable pf-m-compact\" id=\"card-1\">\n          <div class=\"pf-c-card__header\">\n            <img src=\"/assets/images/pf-logo-small.svg\" alt=\"PatternFly logo\" />\n            <div class=\"pf-c-card__actions\">\n              <div class=\"pf-c-dropdown\">\n                <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"card-1-dropdown-kebab-right-aligned-button\" aria-expanded=\"false\" aria-label=\"Actions\">\n                  <i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>\n                </button>\n                <ul class=\"pf-c-dropdown__menu\" aria-labelledby=\"card-1-dropdown-kebab-right-aligned-button\" hidden>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\">Action</button>\n                  </li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item pf-m-disabled\" href=\"#\" aria-disabled=\"true\" tabindex=\"-1\">Disabled link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\" disabled>Disabled action</button>\n                  </li>\n                  <li class=\"pf-c-divider\" role=\"separator\"></li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Separated link</a>\n                  </li>\n                </ul>\n              </div>\n              <input type=\"checkbox\" id=\"card-1-check\" name=\"card-1-check\" aria-labelledby=\"card-1-check-label\" />\n            </div>\n          </div>\n          <div class=\"pf-c-card__title\">\n            <p id=\"card-1-check-label\">Patternfly</p>\n            <div class=\"pf-c-content\">\n              <small>Provided by Red Hat</small>\n            </div>\n          </div>\n          <div class=\"pf-c-card__body\">PatternFly is a community project that promotes design commonality and improves user experience.</div>\n        </div>\n        <div class=\"pf-c-card pf-m-hoverable pf-m-compact\" id=\"card-2\">\n          <div class=\"pf-c-card__header\">\n            <img src=\"/assets/images/activemq-core_200x150.png\" width=\"60px\" alt=\"Logo\" />\n            <div class=\"pf-c-card__actions\">\n              <div class=\"pf-c-dropdown\">\n                <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"card-2-dropdown-kebab-right-aligned-button\" aria-expanded=\"false\" aria-label=\"Actions\">\n                  <i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>\n                </button>\n                <ul class=\"pf-c-dropdown__menu\" aria-labelledby=\"card-2-dropdown-kebab-right-aligned-button\" hidden>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\">Action</button>\n                  </li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item pf-m-disabled\" href=\"#\" aria-disabled=\"true\" tabindex=\"-1\">Disabled link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\" disabled>Disabled action</button>\n                  </li>\n                  <li class=\"pf-c-divider\" role=\"separator\"></li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Separated link</a>\n                  </li>\n                </ul>\n              </div>\n              <input type=\"checkbox\" id=\"card-2-check\" name=\"card-2-check\" aria-labelledby=\"card-2-check-label\" />\n            </div>\n          </div>\n          <div class=\"pf-c-card__title\">\n            <p id=\"card-2-check-label\">ActiveMQ</p>\n            <div class=\"pf-c-content\">\n              <small>Provided by Red Hat</small>\n            </div>\n          </div>\n          <div class=\"pf-c-card__body\">The ActiveMQ component allows messages to be sent to a JMS Queue or Topic; or messages to be consumed from a JMS Queue or Topic using Apache ActiveMQ.</div>\n        </div>\n        <div class=\"pf-c-card pf-m-hoverable pf-m-compact\" id=\"card-3\">\n          <div class=\"pf-c-card__header\">\n            <img src=\"/assets/images/camel-spark_200x150.png\" width=\"60px\" alt=\"Logo\" />\n            <div class=\"pf-c-card__actions\">\n              <div class=\"pf-c-dropdown\">\n                <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"card-3-dropdown-kebab-right-aligned-button\" aria-expanded=\"false\" aria-label=\"Actions\">\n                  <i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>\n                </button>\n                <ul class=\"pf-c-dropdown__menu\" aria-labelledby=\"card-3-dropdown-kebab-right-aligned-button\" hidden>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\">Action</button>\n                  </li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item pf-m-disabled\" href=\"#\" aria-disabled=\"true\" tabindex=\"-1\">Disabled link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\" disabled>Disabled action</button>\n                  </li>\n                  <li class=\"pf-c-divider\" role=\"separator\"></li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Separated link</a>\n                  </li>\n                </ul>\n              </div>\n              <input type=\"checkbox\" id=\"card-3-check\" name=\"card-3-check\" aria-labelledby=\"card-3-check-label\" />\n            </div>\n          </div>\n          <div class=\"pf-c-card__title\">\n            <p id=\"card-3-check-label\">Apache Spark</p>\n            <div class=\"pf-c-content\">\n              <small>Provided by Red Hat</small>\n            </div>\n          </div>\n          <div class=\"pf-c-card__body\">This documentation page covers the Apache Spark component for the Apache Camel.</div>\n        </div>\n        <div class=\"pf-c-card pf-m-hoverable pf-m-compact\" id=\"card-4\">\n          <div class=\"pf-c-card__header\">\n            <img src=\"/assets/images/camel-avro_200x150.png\" width=\"60px\" alt=\"Logo\" />\n            <div class=\"pf-c-card__actions\">\n              <div class=\"pf-c-dropdown\">\n                <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"card-4-dropdown-kebab-right-aligned-button\" aria-expanded=\"false\" aria-label=\"Actions\">\n                  <i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>\n                </button>\n                <ul class=\"pf-c-dropdown__menu\" aria-labelledby=\"card-4-dropdown-kebab-right-aligned-button\" hidden>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\">Action</button>\n                  </li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item pf-m-disabled\" href=\"#\" aria-disabled=\"true\" tabindex=\"-1\">Disabled link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\" disabled>Disabled action</button>\n                  </li>\n                  <li class=\"pf-c-divider\" role=\"separator\"></li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Separated link</a>\n                  </li>\n                </ul>\n              </div>\n              <input type=\"checkbox\" id=\"card-4-check\" name=\"card-4-check\" aria-labelledby=\"card-4-check-label\" />\n            </div>\n          </div>\n          <div class=\"pf-c-card__title\">\n            <p id=\"card-4-check-label\">Avro</p>\n            <div class=\"pf-c-content\">\n              <small>Provided by Red Hat</small>\n            </div>\n          </div>\n          <div class=\"pf-c-card__body\">This component provides a dataformat for avro, which allows serialization and deserialization of messages using Apache Avro’s binary dataformat. Moreover, it provides support for Apache Avro’s rpc, by providing producers and consumers endpoint for using avro over netty or http.</div>\n        </div>\n        <div class=\"pf-c-card pf-m-hoverable pf-m-compact\" id=\"card-5\">\n          <div class=\"pf-c-card__header\">\n            <img src=\"/assets/images/FuseConnector_Icons_AzureServices.png\" width=\"60px\" alt=\"Logo\" />\n            <div class=\"pf-c-card__actions\">\n              <div class=\"pf-c-dropdown\">\n                <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"card-5-dropdown-kebab-right-aligned-button\" aria-expanded=\"false\" aria-label=\"Actions\">\n                  <i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>\n                </button>\n                <ul class=\"pf-c-dropdown__menu\" aria-labelledby=\"card-5-dropdown-kebab-right-aligned-button\" hidden>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\">Action</button>\n                  </li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item pf-m-disabled\" href=\"#\" aria-disabled=\"true\" tabindex=\"-1\">Disabled link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\" disabled>Disabled action</button>\n                  </li>\n                  <li class=\"pf-c-divider\" role=\"separator\"></li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Separated link</a>\n                  </li>\n                </ul>\n              </div>\n              <input type=\"checkbox\" id=\"card-5-check\" name=\"card-5-check\" aria-labelledby=\"card-5-check-label\" />\n            </div>\n          </div>\n          <div class=\"pf-c-card__title\">\n            <p id=\"card-5-check-label\">Azure Services</p>\n            <div class=\"pf-c-content\">\n              <small>Provided by Red Hat</small>\n            </div>\n          </div>\n          <div class=\"pf-c-card__body\">The Camel Components for Windows Azure Services provide connectivity to Azure services from Camel.</div>\n        </div>\n        <div class=\"pf-c-card pf-m-hoverable pf-m-compact\" id=\"card-6\">\n          <div class=\"pf-c-card__header\">\n            <img src=\"/assets/images/camel-saxon_200x150.png\" width=\"60px\" alt=\"Logo\" />\n            <div class=\"pf-c-card__actions\">\n              <div class=\"pf-c-dropdown\">\n                <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"card-6-dropdown-kebab-right-aligned-button\" aria-expanded=\"false\" aria-label=\"Actions\">\n                  <i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>\n                </button>\n                <ul class=\"pf-c-dropdown__menu\" aria-labelledby=\"card-6-dropdown-kebab-right-aligned-button\" hidden>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\">Action</button>\n                  </li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item pf-m-disabled\" href=\"#\" aria-disabled=\"true\" tabindex=\"-1\">Disabled link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\" disabled>Disabled action</button>\n                  </li>\n                  <li class=\"pf-c-divider\" role=\"separator\"></li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Separated link</a>\n                  </li>\n                </ul>\n              </div>\n              <input type=\"checkbox\" id=\"card-6-check\" name=\"card-6-check\" aria-labelledby=\"card-6-check-label\" />\n            </div>\n          </div>\n          <div class=\"pf-c-card__title\">\n            <p id=\"card-6-check-label\">Crypto</p>\n            <div class=\"pf-c-content\">\n              <small>Provided by Red Hat</small>\n            </div>\n          </div>\n          <div class=\"pf-c-card__body\">For providing flexible endpoints to sign and verify exchanges using the Signature Service of the Java Cryptographic Extension.</div>\n        </div>\n        <div class=\"pf-c-card pf-m-hoverable pf-m-compact\" id=\"card-7\">\n          <div class=\"pf-c-card__header\">\n            <img src=\"/assets/images/camel-dropbox_200x150.png\" width=\"60px\" alt=\"Logo\" />\n            <div class=\"pf-c-card__actions\">\n              <div class=\"pf-c-dropdown\">\n                <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"card-7-dropdown-kebab-right-aligned-button\" aria-expanded=\"false\" aria-label=\"Actions\">\n                  <i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>\n                </button>\n                <ul class=\"pf-c-dropdown__menu\" aria-labelledby=\"card-7-dropdown-kebab-right-aligned-button\" hidden>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\">Action</button>\n                  </li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item pf-m-disabled\" href=\"#\" aria-disabled=\"true\" tabindex=\"-1\">Disabled link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\" disabled>Disabled action</button>\n                  </li>\n                  <li class=\"pf-c-divider\" role=\"separator\"></li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Separated link</a>\n                  </li>\n                </ul>\n              </div>\n              <input type=\"checkbox\" id=\"card-7-check\" name=\"card-7-check\" aria-labelledby=\"card-7-check-label\" />\n            </div>\n          </div>\n          <div class=\"pf-c-card__title\">\n            <p id=\"card-7-check-label\">DropBox</p>\n            <div class=\"pf-c-content\">\n              <small>Provided by Red Hat</small>\n            </div>\n          </div>\n          <div class=\"pf-c-card__body\">The dropbox: component allows you to treat Dropbox remote folders as a producer or consumer of messages.</div>\n        </div>\n        <div class=\"pf-c-card pf-m-hoverable pf-m-compact\" id=\"card-8\">\n          <div class=\"pf-c-card__header\">\n            <img src=\"/assets/images/camel-infinispan_200x150.png\" width=\"60px\" alt=\"Logo\" />\n            <div class=\"pf-c-card__actions\">\n              <div class=\"pf-c-dropdown\">\n                <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"card-8-dropdown-kebab-right-aligned-button\" aria-expanded=\"false\" aria-label=\"Actions\">\n                  <i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>\n                </button>\n                <ul class=\"pf-c-dropdown__menu\" aria-labelledby=\"card-8-dropdown-kebab-right-aligned-button\" hidden>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\">Action</button>\n                  </li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item pf-m-disabled\" href=\"#\" aria-disabled=\"true\" tabindex=\"-1\">Disabled link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\" disabled>Disabled action</button>\n                  </li>\n                  <li class=\"pf-c-divider\" role=\"separator\"></li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Separated link</a>\n                  </li>\n                </ul>\n              </div>\n              <input type=\"checkbox\" id=\"card-8-check\" name=\"card-8-check\" aria-labelledby=\"card-8-check-label\" />\n            </div>\n          </div>\n          <div class=\"pf-c-card__title\">\n            <p id=\"card-8-check-label\">JBoss Data Grid</p>\n            <div class=\"pf-c-content\">\n              <small>Provided by Red Hat</small>\n            </div>\n          </div>\n          <div class=\"pf-c-card__body\">Read or write to a fully-supported distributed cache and data grid for faster integration services.</div>\n        </div>\n        <div class=\"pf-c-card pf-m-hoverable pf-m-compact\" id=\"card-9\">\n          <div class=\"pf-c-card__header\">\n            <img src=\"/assets/images/FuseConnector_Icons_REST.png\" width=\"60px\" alt=\"Logo\" />\n            <div class=\"pf-c-card__actions\">\n              <div class=\"pf-c-dropdown\">\n                <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"card-9-dropdown-kebab-right-aligned-button\" aria-expanded=\"false\" aria-label=\"Actions\">\n                  <i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>\n                </button>\n                <ul class=\"pf-c-dropdown__menu\" aria-labelledby=\"card-9-dropdown-kebab-right-aligned-button\" hidden>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\">Action</button>\n                  </li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item pf-m-disabled\" href=\"#\" aria-disabled=\"true\" tabindex=\"-1\">Disabled link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\" disabled>Disabled action</button>\n                  </li>\n                  <li class=\"pf-c-divider\" role=\"separator\"></li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Separated link</a>\n                  </li>\n                </ul>\n              </div>\n              <input type=\"checkbox\" id=\"card-9-check\" name=\"card-9-check\" aria-labelledby=\"card-9-check-label\" />\n            </div>\n          </div>\n          <div class=\"pf-c-card__title\">\n            <p id=\"card-9-check-label\">REST</p>\n            <div class=\"pf-c-content\">\n              <small>Provided by Red Hat</small>\n            </div>\n          </div>\n          <div class=\"pf-c-card__body\">The rest component allows to define REST endpoints (consumer) using the Rest DSL and plugin to other Camel components as the REST transport. From Camel 2.18 onwards the rest component can also be used as a client (producer) to call REST services.</div>\n        </div>\n        <div class=\"pf-c-card pf-m-hoverable pf-m-compact\" id=\"card-10\">\n          <div class=\"pf-c-card__header\">\n            <img src=\"/assets/images/camel-swagger-java_200x150.png\" width=\"60px\" alt=\"Logo\" />\n            <div class=\"pf-c-card__actions\">\n              <div class=\"pf-c-dropdown\">\n                <button class=\"pf-c-dropdown__toggle pf-m-plain\" type=\"button\" id=\"card-10-dropdown-kebab-right-aligned-button\" aria-expanded=\"false\" aria-label=\"Actions\">\n                  <i class=\"fas fa-ellipsis-v\" aria-hidden=\"true\"></i>\n                </button>\n                <ul class=\"pf-c-dropdown__menu\" aria-labelledby=\"card-10-dropdown-kebab-right-aligned-button\" hidden>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\">Action</button>\n                  </li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item pf-m-disabled\" href=\"#\" aria-disabled=\"true\" tabindex=\"-1\">Disabled link</a>\n                  </li>\n                  <li>\n                    <button class=\"pf-c-dropdown__menu-item\" type=\"button\" disabled>Disabled action</button>\n                  </li>\n                  <li class=\"pf-c-divider\" role=\"separator\"></li>\n                  <li>\n                    <a class=\"pf-c-dropdown__menu-item\" href=\"#\">Separated link</a>\n                  </li>\n                </ul>\n              </div>\n              <input type=\"checkbox\" id=\"card-10-check\" name=\"card-10-check\" aria-labelledby=\"card-10-check-label\" />\n            </div>\n          </div>\n          <div class=\"pf-c-card__title\">\n            <p id=\"card-10-check-label\">SWAGGER</p>\n            <div class=\"pf-c-content\">\n              <small>Provided by Red Hat</small>\n            </div>\n          </div>\n          <div class=\"pf-c-card__body\">Expose REST services and their APIs using Swagger specification.</div>\n        </div>\n      </div>\n    </section>\n  </main>\n</div>","title":"Basic","lang":"html","isFullscreen":true}}>
    </Example>
  </React.Fragment>
);
DocumentationDemosCardViewCoreDocs.Component.displayName = 'DocumentationDemosCardViewCoreDocs';
