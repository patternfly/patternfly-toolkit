import React from "react";
import {
    Brand,
    Grid,
    GridItem,
    Nav,
    NavItem,
    NavList,
    PageSection,
    Text,
    TextVariants
} from "@patternfly/react-core";
import { Link } from 'theme-patternfly-org/components';
import GithubIcon from '@patternfly/react-icons/dist/esm/icons/github-icon';
import TwitterIcon from '@patternfly/react-icons/dist/esm/icons/twitter-icon';
import redhatLogo from "./RHLogo.png";
import "./footer.css";
import logo from '../../layouts/logo.svg';

export const Footer = () => (
  <React.Fragment>
    <PageSection key="footer-1" className="ws-org-pfsite-l-footer">
      <Grid>
        <GridItem
          sm={12}
          md={6}
          mdOffset={1}
          className="pf-u-mb-lg pf-u-mb-0-on-sm"
        >
          <Grid className="pf-u-py-xl">
            <GridItem sm={6} md={4} className="pf-u-ml-md pf-u-ml-0-on-md">
              <p
                className="pf-c-title ws-org-pfsite-footer-menu-list-title"
              >
                QUICKLINKS
              </p>
              <Nav aria-label="Quick Links" className="pf-m-white">
                <NavList className="pf-c-nav__list-footer">
                  <li className="pf-c-nav__item">
                    <Link
                      className="pf-c-nav__link"
                      to={"/get-started/about"}
                      aria-label="Get started with PatternFly 4"
                    >
                      Get started
                    </Link>
                  </li>
                  <li className="pf-c-nav__item">
                    <Link
                      className="pf-c-nav__link"
                      to="/components/about-modal"
                      aria-label="PatternFly 4 components"
                    >
                      Components
                    </Link>
                  </li>
                  <li className="pf-c-nav__item">
                    <Link
                      className="pf-c-nav__link"
                      to="/layouts/bullseye"
                      aria-label="PatternFly 4 layouts"
                    >
                      Layouts
                    </Link>
                  </li>
                  <li className="pf-c-nav__item">
                    <Link
                      className="pf-c-nav__link"
                      to="/guidelines/colors"
                      aria-label="PatternFly 4 styles"
                    >
                      Styles
                    </Link>
                  </li>
                  <NavItem
                    to="https://www.patternfly.org/v3/"
                    target="top"
                    aria-label="View the PatternFly 3 website"
                  >
                    PatternFly 3
                  </NavItem>
                </NavList>
              </Nav>
            </GridItem>
            <GridItem
              sm={6}
              md={4}
              className="pf-u-mt-lg pf-u-mt-0-on-sm pf-u-ml-md pf-u-ml-0-on-md"
            >
              <p
                className="pf-c-title ws-org-pfsite-footer-menu-list-title"
              >
                CONTRIBUTE
              </p>
              <Nav aria-label="Contribute">
                <NavList className="pf-c-nav__list-footer">
                  <li className="pf-c-nav__item">
                    <Link
                      className="pf-c-nav__link"
                      to="/get-started/design"
                      aria-label="How to contribute as a Designer"
                    >
                      Designers
                    </Link>
                  </li>
                  <li className="pf-c-nav__item">
                    <Link
                      className="pf-c-nav__link"
                      to="/get-started/develop"
                      aria-label="How to contribute as a Developer"
                    >
                      Developers
                    </Link>
                  </li>
                  <NavItem
                    to="https://github.com/patternfly/patternfly/blob/master/CODE_OF_CONDUCT.md"
                    target="top"
                    aria-label="PatternFly 4 Code of Conduct"
                  >
                    Code of Conduct
                  </NavItem>
                </NavList>
              </Nav>
            </GridItem>
            <GridItem
              sm={6}
              md={4}
              className="pf-u-mt-lg pf-u-mt-0-on-md pf-u-ml-md pf-u-ml-0-on-md"
            >
              <p
                className="ws-org-pfsite-footer-menu-list-title"
              >
                STAY IN TOUCH
              </p>
              <Nav aria-label="Stay in touch" className="pf-m-white">
                <NavList className="pf-c-nav__list-footer">
                  <NavItem
                    to="//slack.patternfly.org"
                    target="top"
                    aria-label="Join the PatternFly 4 Slack"
                  >
                    Slack
                  </NavItem>
                  <NavItem
                    to="//forum.patternfly.org"
                    target="top"
                    aria-label="Visit the PatternFly 4 forum"
                  >
                    Forum
                  </NavItem>
                  <NavItem
                    to="//redhat.com/mailman/listinfo/patternfly"
                    target="top"
                    aria-label="Join the PatternFly 4 mailing list"
                  >
                    Mailing list
                  </NavItem>
                  <NavItem
                    to="//medium.com/patternfly"
                    target="top"
                    aria-label="Read the PatternFly 4 blog"
                  >
                    PatternFly Medium
                  </NavItem>
                </NavList>
              </Nav>
            </GridItem>
          </Grid>
        </GridItem>
        <GridItem sm={12} md={4}>
          <Grid className="pf-u-pt-xl ws-org-pfsite-l-footer-column">
            <GridItem className="pf-u-px-xl">
              <a className="pf-c-page__header-brand-link pf-c-brand ws-org-pfsite-footer-menu-about-logo pf-u-pb-md" href="/">
                <Brand src={logo} alt="Patternfly Logo" />
              </a>
              <p className="ws-org-pfsite-footer-menu-about-description">
                PatternFly is an open source design system built to drive consistency and unify teams. From documentation and components to code examples and tutorials, PatternFly is a place where design and development can thrive. We’re on a mission to help teams build consistent, accessible, and scalable enterprise product experiences—the open source way.
              </p>
            </GridItem>
            <GridItem className="ws-org-pfsite-footer-menu-social-links pf-u-px-xl">
              <Text
                component={TextVariants.a}
                href="//github.com/patternfly"
                target="top"
                aria-label="Link to PatternFly GitHub page"
              >
                <GithubIcon />
              </Text>
              <Text
                component={TextVariants.a}
                href="//twitter.com/patternfly"
                target="top"
                aria-label="Link to PatternFly Twitter page"
              >
                <TwitterIcon />
              </Text>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </PageSection>
    <PageSection key="footer-2" className="ws-org-pfsite-l-footer-dark pf-m-no-fill">
      <Grid className="pf-u-py-xl-on-sm pf-u-py-0-on-md pf-u-align-items-center">
        <GridItem md={2} mdOffset={1}>
          <Text
            component={TextVariants.a}
            href="//www.redhat.com"
            target="top"
            aria-label="Visit Red Hat.com"
          >
            <img
              src={redhatLogo}
              alt="Red Hat logo"
              width="145px"
              height="613px"
            />
          </Text>
        </GridItem>
        <GridItem md={4} lg={3} xl={2}>
          <span className="ws-org-pfsite-site-copyright">
            Copyright &copy; 2021 Red Hat, Inc.
          </span>
        </GridItem>
        <GridItem md={4} lg={5} className="pf-u-ml-xl-on-xl">
          <Text
            component={TextVariants.a}
            href="//www.redhat.com/en/about/privacy-policy"
            target="top"
            aria-label="Privacy statement"
          >
            Privacy statement
          </Text>
          <Text
            component={TextVariants.a}
            href="//www.redhat.com/en/about/terms-use"
            target="top"
            aria-label="Terms of use"
          >
            Terms of use
          </Text>
          <Text
            component={TextVariants.a}
            href="//www.redhat.com/en/about/all-policies-guidelines"
            target="top"
            aria-label="All policies and guidelines"
          >
            All policies and guidelines
          </Text>
        </GridItem>
      </Grid>
    </PageSection>
  </React.Fragment>
);
