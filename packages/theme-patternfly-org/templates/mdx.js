import React from 'react';
import { PageSection, Title } from '@patternfly/react-core';
import { css } from '@patternfly/react-styles';
import { Router, useLocation } from '@reach/router';
import { CSSVariables, PropsTable, TableOfContents, Link, AccordionHeader, InlineAlert } from '../components';
import { capitalize } from '../helpers';
import './mdx.css';

const MDXChildTemplate = (
  {
    Component,
    source,
    propComponents = [],
    sourceLink,
    toc = [],
    optIn,
    beta,
    cssPrefix = []
  },
  index = 0
) => {
  const cssVarsTitle = cssPrefix.length > 0 && 'CSS variables';
  const propsTitle = propComponents.length > 0 && 'Props';
  if (propsTitle && !toc.includes(propsTitle)) {
    toc.push(propsTitle);
  }
  if (cssVarsTitle && !toc.includes(cssVarsTitle)) {
    toc.push(cssVarsTitle);
  }
  const InlineAlerts = (
    <React.Fragment>
      {optIn && (
        <InlineAlert title="Opt-in feature">
          {optIn}
        </InlineAlert>
      )}
      {beta && (
        <InlineAlert title="Beta feature">
          This Beta component is currently under review, so please join in and give us your feedback on the <a href="https://forum.patternfly.org/">PatternFly forum</a>.
        </InlineAlert>
      )}
    </React.Fragment>
  );
  // Create dynamic component for @reach/router
  const ChildComponent = () => (
    <div className="ws-mdx-child">
      {toc && toc.length > 1 && (
        <TableOfContents items={toc} />
      )}
      <div className="ws-mdx-content">
        {InlineAlerts}
        <Component />
        {propsTitle && (
          <AccordionHeader title={propsTitle} titleId="props">
            {propComponents.map(component => (
              <PropsTable
                key={component.name}
                caption={`${component.name} properties`}
                rows={component.props} />
            ))}
          </AccordionHeader>
        )}
        {cssVarsTitle && (
          <AccordionHeader title={cssVarsTitle} titleId="css-variables">
            <CSSVariables prefix={cssPrefix} />
          </AccordionHeader>
        )}
        {sourceLink && (
          <React.Fragment>
            <br />
            <a href={sourceLink} target="_blank">View source on Github</a>
          </React.Fragment>
        )}
      </div>
    </div>
  );
  ChildComponent.displayName = `MDXChildTemplate${Component.displayName}`;
  return <ChildComponent key={source} path={source} default={index === 0} />;
}

export const MDXTemplate = ({
  id,
  sources = []
}) => {
  const sourceKeys = sources.map(v => v.source);
  const isSinglePage = sourceKeys.length === 1;
  const { pathname } = useLocation();
  let activeSource = pathname.replace(/\/$/, '').split('/').pop();
  if (!sourceKeys.includes(activeSource)) {
    activeSource = sourceKeys[0];
  }

  return (
    <React.Fragment>
      <PageSection
        id={isSinglePage ? 'main-content' : 'nav-content'}
        type={isSinglePage ? 'default' : 'nav'}
      >
        <Title size="4xl" headingLevel="h1" id="ws-page-title">
          {id}
        </Title>
        {!isSinglePage && (
          <div className="pf-c-tabs ws-source-tabs">
            <ul className="pf-c-tabs__list">
              {sourceKeys.map(source => (
                <li
                  key={source}
                  className={css(
                    'pf-c-tabs__item',
                    activeSource === source && 'pf-m-current'
                  )}
                >
                  <Link className="pf-c-tabs__link" to={source}>
                    {source === 'html'
                      ? 'HTML'
                      : capitalize(source.replace(/-/g, ' '))}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isSinglePage && (
          <MDXChildTemplate {...sources[0]} />
        )}
      </PageSection>
      {!isSinglePage && (
        <PageSection id="main-content" className="ws-child-section">
          <Router className="pf-u-h-100" primary={false}>
            {sources.map(MDXChildTemplate)}
          </Router>
        </PageSection>
      )}
    </React.Fragment>
  );
}
