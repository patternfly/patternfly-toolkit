import React from 'react';
import { Link } from 'theme-patternfly-org/components';
import {
  Flex,
  FlexItem,
  Grid,
  GridItem,
  PageSection,
  PageSectionVariants,
  Title,
  TextContent,
  Text,
  TextVariants
} from '@patternfly/react-core';
import ArrowRightIcon from '@patternfly/react-icons/dist/esm/icons/arrow-right-icon';
import GithubIcon from '@patternfly/react-icons/dist/esm/icons/github-icon';
import orb from '../images/pf4-logo.svg';
import accessible from '../images/accessible.svg';
import modular from '../images/modular.svg';
import scale from '../images/scale.svg';
import consistent from '../images/consistent.svg';
import open from '../images/open.svg';
import { AutoLinkHeader } from 'theme-patternfly-org/components/autoLinkHeader/autoLinkHeader';
import './home.css';

const aboutPatternFly = "Hello, we're PatternFly.";
const patternFlyPrinciples = 'Flyer fundamentals';

const HomePage = () => (
  <React.Fragment>
    <PageSection variant={PageSectionVariants.light} className="pf4-c-background-image ws-homepage-main-section">
      <Grid>
        <GridItem sm={12} md={8} mdOffset={2} lg={6} lgOffset={3} className="pf-u-py-2xl pf-u-text-align-center">
          <TextContent>
            <img src={orb} alt="PatternFly logo" className="fadeInDown animated fadeInOne" />
            <Title headingLevel="h1" size="4xl" className="pf-m-white pf4-site-c-hero fadeIn animated fadeInTwo">
              Build scalable experiences in the open.
            </Title>
            <Text className="pf-c-title pf-m-xl pf-m-white pf-u-mb-md pf-u-mt-lg pf-u-mb-3xl-on-md fadeInUp animated fadeInThree">
              PatternFly is an open source design system built to drive consistency and unify teams.
            </Text>
            <div className="pf-u-display-flex pf-u-justify-content-center pf-u-flex-direction-column pf-u-flex-direction-row-on-md">
              <Link
                to="/get-started/about"
                className="pf-c-button pf4-c-button__cta-primary pf-u-mr-0 pf-u-mb-md pf-u-mb-0-on-md pf-u-mr-xl-on-md fadeIn animated fadeInFour"
                aria-label="Get started with PatternFly"
              >
                Get started
              </Link>
              <a className="pf-c-button pf4-c-button__cta-outline fadeIn animated fadeInFour" href="//github.com/patternfly" target="_blank">
                <GithubIcon className="pf-u-mr-sm" />GitHub
              </a>
            </div>
          </TextContent>
        </GridItem>
      </Grid>
    </PageSection>
    <PageSection variant={PageSectionVariants.light} className="ws-homepage-gray ws-homepage-main-section">
      <Grid>
        <GridItem sm={12} md={6} mdOffset={3} className="pf-u-py-2xl pf-u-text-align-center" id="about-patternfly-section">
          <AutoLinkHeader size="h1" headingLevel="h2" className="ws-title pf-u-mb-md">
            {aboutPatternFly}
          </AutoLinkHeader>
          <Text component={TextVariants.p} className="ws-mdx-p">
            We think quality product experiences should be easy to build and easy to scale, so we provide the tools to make that happen. 
          </Text>
          <Text component={TextVariants.p} className="ws-mdx-p">
            From documentation and components to code examples and tutorials, PatternFly has it all—and our community of Flyers help make it better every day.
          </Text>
        </GridItem>
      </Grid>
    </PageSection>
    <PageSection variant={PageSectionVariants.light} className="ws-homepage-gray pf4-c-background-lines ws-homepage-main-section">
      <Grid gutter="md" className="pf-u-pb-3xl-on-sm">
        <GridItem sm={12}>
          <Grid>
            <GridItem
              sm={12}
              md={4}
              mdOffset={1}
              lgOffset={2}
              className="pf-u-display-flex pf-u-display-block-on-sm pf-u-flex-direction-column pf-u-pt-2xl pf-u-pt-0-on-sm"
            >
              <TextContent>
                <div className="pf-u-pb-2xl">
                  <Text component={TextVariants.h2}>We guide, you decide</Text>
                  <Text component={TextVariants.p} className="ws-mdx-p">
                    PatternFly’s foundation is made of design guidelines, so help is always there when you need it. Check out our approach to icons, color, content, and more.
                  </Text>
                  <Text
                    aria-label="view design guidelines"
                    className="pf-u-pl-0 pf4-c-link__text ws-mdx-a"
                  >
                    <Link to="/guidelines/colors">
                      View design guidelines <ArrowRightIcon />
                    </Link>
                  </Text>
                </div>
                <div className="pf-u-pb-2xl">
                  <Text component={TextVariants.h2}>Lay it out</Text>
                  <Text component={TextVariants.p} className="ws-mdx-p">
                    A layout provides a fully responsive page structure that keeps your components organized and aligned regardless of screen size.
                  </Text>
                  <Text
                    aria-label="view layouts"
                    className="pf-u-pl-0 pf4-c-link__text ws-mdx-a"
                  >
                    <Link to="/layouts/bullseye">
                      View layouts <ArrowRightIcon />
                    </Link>
                  </Text>
                </div>
                <div className="pf-u-pb-2xl">
                  <Text component={TextVariants.h2}>Build things your way</Text>
                  <Text component={TextVariants.p} className="ws-mdx-p">
                    Components are like building blocks. Designed to be flexible and modular, you can mix and match components to create a solution for almost any UI problem.
                  </Text>
                  <Text
                    aria-label="view components"
                    className="pf-u-pl-0 pf4-c-link__text ws-mdx-a"
                  >
                    <Link to="/components/about-modal">
                      View components <ArrowRightIcon />
                    </Link>
                  </Text>
                </div>
                <div className="pf-u-pb-2xl">
                  <Text component={TextVariants.h2}>See it in action</Text>
                  <Text component={TextVariants.p} className="ws-mdx-p">
                    Components are better together. Demos show how multiple components can be used in a single design. They also provide  some useful starter code, so the days of creating complex layouts from scratch are over.
                  </Text>
                  <Text
                    aria-label="view demos"
                    className="pf-u-pl-0 pf4-c-link__text ws-mdx-a"
                  >
                    <Link to="/demos/primary-detail">
                      View demos <ArrowRightIcon />
                    </Link>
                  </Text>
                </div>
              </TextContent>
            </GridItem>
            <GridItem sm={12} md={6}>
              <div className="pf4-c-image__laptop" aria-hidden />
              <div className="pf4-c-image__phone" aria-hidden />
              <div className="pf4-c-image__screen" aria-hidden />
              <div className="pf4-c-image__desktop" aria-hidden />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </PageSection>
    <PageSection variant={PageSectionVariants.darker} className="pf4-c-background-image-principles ws-homepage-main-section">
    <Grid gutter="md" className="pf-u-py-3xl">
      <GridItem sm={12} md={6} mdOffset={3} className="pf-u-text-align-center">
        <TextContent>
          <Title headingLevel="h2" size="4xl" className="pf-u-mb-4xl pf-m-white pf-u-text-align-center" id="patternfly-principles">
            {patternFlyPrinciples}
          </Title>
          <Text component={TextVariants.p} className="ws-mdx-p">
            Every Flyer is unique, with different ideas and opinions. But there are some things we all agree on. These are our Flyer fundamentals.
          </Text>
        </TextContent>
      </GridItem>
    </Grid>
    <Grid className="pf-m-white" gutter="lg">
      <GridItem span={12} md={10} mdOffset={1} lg={9} lgOffset={2}>
        <TextContent>
          <Grid>
            <GridItem span={12} lg={11} className="ws-pf-principle">
              <Flex>
                <FlexItem>
                  <img
                    className="ws-principles-img"
                    src={modular}
                    aria-hidden
                  />
                </FlexItem>
                <FlexItem>
                  <Text component={TextVariants.h2}>Make it flexible.</Text>
                  <Text component={TextVariants.p} className="pf-u-mb-3xl ws-mdx-p">
                    Open source thrives on variety, and our resources do too. Our components can be arranged in any number of ways, and our CSS variable system can be used for all kinds of customization.
                  </Text>
                </FlexItem>
              </Flex>
            </GridItem>
            <GridItem span={12} lg={11} className="ws-pf-principle">
              <Flex>
                <FlexItem>
                  <img
                  className="ws-principles-img"
                  src={accessible}
                  aria-hidden
                />
                </FlexItem>
                <FlexItem>
                  <Text component={TextVariants.h2}>Make it accessible.</Text>
                  <Text component={TextVariants.p} className="pf-u-mb-3xl ws-mdx-p">
                    Building applications that work for everyone, regardless of ability, is just the right thing to do. Our accessible markup and guidance is geared towards creating experiences that people of all abilities can enjoy.
                  </Text>
                </FlexItem>
              </Flex>
            </GridItem>
            <GridItem span={12} lg={11} className="ws-pf-principle">
              <Flex>
                <FlexItem>
                  <img
                    className="ws-principles-img"
                    src={consistent}
                    aria-hidden
                  />
                  </FlexItem>
                  <FlexItem>
                  <Text component={TextVariants.h2}>Make it consistent.</Text>
                  <Text component={TextVariants.p} className="pf-u-mb-3xl ws-mdx-p">
                    The best product experiences stem from teamwork. Our clear guidelines and tools help streamline communication so that all teams can create unified applications and interfaces.
                  </Text>
                </FlexItem>
              </Flex>
            </GridItem>
            <GridItem span={12} lg={11} className="ws-pf-principle">
              <Flex>
                <FlexItem>
                  <img
                    className="ws-principles-img"
                    src={scale}
                    aria-hidden
                  />
                  </FlexItem>
                  <FlexItem>
                  <Text component={TextVariants.h2}>Make it scalable.</Text>
                  <Text component={TextVariants.p} className="pf-u-mb-3xl ws-mdx-p">
                  Helping teams work productively at scale is at the heart of everything we do. Our components are designed for enterprise IT applications used in businesses of all sizes.
                  </Text>
                </FlexItem>
              </Flex>
            </GridItem>
            <GridItem span={12} lg={11} className="ws-pf-principle">
              <Flex>
                <FlexItem>
                  <img
                    className="ws-principles-img"
                    src={open}
                    aria-hidden
                  />
                  </FlexItem>
                  <FlexItem>
                  <Text component={TextVariants.h2}>Make it open.</Text>
                  <Text component={TextVariants.p} className="pf-u-mb-3xl ws-mdx-p">
                    We're focused on shaping the future of open source design and development, and we can't do this alone. So we work as an open source community, where everyone is free to share their ideas and contribute their work.
                  </Text>
                </FlexItem>
              </Flex>
            </GridItem>
          </Grid>
        </TextContent>
        <div className="pf-u-pb-md">
          <Text
            aria-label="get started developers"
            className="pf-u-pl-0 pf4-c-link__text ws-mdx-a"
          >
            <Link to="/get-started/develop" className="pf-m-white ws-get-started">
              Get started for developers <ArrowRightIcon />
            </Link>
          </Text>
        </div>
        <div className="pf-u-pb-md">
          <Text
            aria-label="get started designers"
            className="pf-u-pl-0 pf4-c-link__text ws-mdx-a"
          >
            <Link to="/get-started/design" className="pf-m-white ws-get-started">
              Get started for designers <ArrowRightIcon />
            </Link>
          </Text>
        </div>
      </GridItem>
    </Grid>
  </PageSection>
  </React.Fragment>
);

export default HomePage;
