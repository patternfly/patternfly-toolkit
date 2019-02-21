import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
// import Prism from 'prismjs'; // eslint-disable-line no-unused-vars
// import 'prismjs/themes/prism-coy.css';
import {
  Nav,
  NavExpandable,
  NavItem,
  NavList,
  Form,
  TextInput
} from '@patternfly/react-core';
import Switcher from '../../switcher';
import { Location } from '@reach/router';
import { css } from '@patternfly/react-styles';
import styles from '../../navigation/navigation.styles';

class CoreSideNav extends React.Component {
  state = {
    searchValue: ''
  };

  handleSearchChange = (checked, event) => {
    const searchValue = event.target.value;
    this.setState(() => ({
      searchValue
    }));
  };

  render() {
    const { data } = this.props;
    const { searchValue } = this.state;

    if (!data.allSitePage) {
      return;
    }
    const allPages = data.allSitePage.edges.reduce((accum, edge) => {
      const { type, label } = edge.node.fields;

      if (!accum[type]) {
        accum[type] = [];
      }

      accum[type].push({
        path: edge.node.path,
        text: label,
        className: `is-${type}`
      });
      return accum;
    }, {});

    const { components, layouts, demos, utilities, 'upgrade-examples': upgradeExamples} = allPages;

    const searchRE = new RegExp(searchValue, 'i');

    const filteredComponents = components.filter(c => searchRE.test(c.text));
    const filteredLayouts = layouts.filter(c => searchRE.test(c.text));
    const filteredDemos = demos.filter(c => searchRE.test(c.text));
    const filteredUtilities = utilities.filter(c => searchRE.test(c.text));
    const filteredUpgradeExamples = upgradeExamples.filter(c => searchRE.test(c.text));

    const SideNav = (
      <Location>
        {({ location }) => {
          // console.log(location);
          const currentPath = location.pathname;
          return (
            <Nav aria-label="Nav">
              <Switcher />
              <NavList>
              <Form className={css(styles.search)} onSubmit={event => { event.preventDefault(); return false; }}>
                <TextInput
                  type="text"
                  id="primaryComponentSearch"
                  name="primaryComponentSearch"
                  placeholder="Search"
                  value={searchValue}
                  onChange={this.handleSearchChange}
                />
              </Form>
                <NavExpandable title="Components" isExpanded={currentPath.indexOf('/components/') > -1 || (searchValue && filteredComponents.length > 0)} isActive={currentPath.indexOf(/components/) > -1}>
                  {filteredComponents.map(navItem => {
                    const { path, text } = navItem;
                    const isFullPage = path.endsWith('-full');
                    if (isFullPage) {
                      return null;
                    }
                    return (
                    <NavItem
                      key={path}
                      isActive={currentPath.indexOf(path) > -1}
                    >
                      <Link to={path}>
                        {text}
                      </Link>
                    </NavItem>
                  )})}
              </NavExpandable>
              <NavExpandable title="Layouts" isExpanded={currentPath.indexOf('/layouts/') > -1 || (searchValue && filteredLayouts.length > 0)} isActive={currentPath.indexOf(/layouts/) > -1}>
                {filteredLayouts.map(navItem => {
                    const { path, text } = navItem;
                    const isFullPage = path.endsWith('-full');
                    if (isFullPage) {
                      return null;
                    }
                    return (
                    <NavItem
                      key={path}
                      isActive={currentPath.indexOf(path) > -1}
                    >
                      <Link to={path}>
                        {text}
                      </Link>
                    </NavItem>
                  )})}
              </NavExpandable>
              <NavExpandable title="Utilities" isExpanded={currentPath.indexOf('/utilities/') > -1 || (searchValue && filteredUtilities.length > 0)} isActive={currentPath.indexOf(/utilities/) > -1}>
                {filteredUtilities.map(navItem => {
                    const { path, text } = navItem;
                    const isFullPage = path.endsWith('-full');
                    if (isFullPage) {
                      return null;
                    }
                    return (
                    <NavItem
                      key={path}
                      isActive={currentPath.indexOf(path) > -1}
                    >
                      <Link to={path}>
                        {text}
                      </Link>
                    </NavItem>
                  )})}
              </NavExpandable>
              <NavExpandable title="Demos" isExpanded={currentPath.indexOf('/demos/') > -1 || (searchValue && filteredDemos.length > 0)} isActive={currentPath.indexOf(/demos/) > -1}>
                {filteredDemos.map(navItem => {
                    const { path, text } = navItem;
                    const isFullPage = path.endsWith('-full');
                    if (isFullPage) {
                      return null;
                    }
                    return (
                      <NavItem
                        key={path}
                        isActive={currentPath.indexOf(path) > -1}
                      >
                        <Link to={path}>
                          {text}
                        </Link>
                      </NavItem>
                  )})}
              </NavExpandable>
              <NavExpandable title="Upgrade Examples" isExpanded={currentPath.indexOf('/upgrade-examples/') > -1 || (searchValue && filteredUpgradeExamples.length > 0)} isActive={currentPath.indexOf(/upgrade-examples/) > -1}>
                {filteredUpgradeExamples.map(navItem => {
                    const { path, text } = navItem;
                    const isFullPage = path.endsWith('-full');
                    if (isFullPage) {
                      return null;
                    }
                    return (
                    <NavItem
                      key={path}
                      isActive={currentPath.indexOf(path) > -1}
                    >
                      <Link to={path}>
                        {text}
                      </Link>
                    </NavItem>
                  )})}
              </NavExpandable>
              <NavItem isActive={currentPath.indexOf('/documentation/core/css-variables/') > -1}>
                  <Link to="/documentation/core/css-variables/">CSS Variables</Link>
                </NavItem>
              </NavList>
            </Nav>
          );
        }}
      </Location>
    );
    return SideNav;
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query IndexOtherPageQuery {
        allSitePage(filter: { path: { glob: "/documentation/core/**" }, fields: { label: { ne: null } } }, sort: {fields: fields___label}) {
          edges {
            node {
              path
              fields {
                label
                type
              }
            }
          }
        }
      }
    `}
    render={data => <CoreSideNav data={data} {...props} />}
  />
);
