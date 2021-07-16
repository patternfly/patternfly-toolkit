import React from 'react';
import { Link } from 'theme-patternfly-org/components';
import { Grid, GridItem, PageSection, PageSectionVariants, Split, SplitItem, Title } from '@patternfly/react-core';
import './community.css';
import communityPageHeader from './community-page-header.svg';
import community1 from './community-1.svg';
import community2 from './community-2.svg';
import community3 from './community-3.svg';
import ChatIcon from '@patternfly/react-icons/dist/esm/icons/chat-icon';
import QuestionIcon from '@patternfly/react-icons/dist/esm/icons/question-icon';
import CatalogIcon from '@patternfly/react-icons/dist/esm/icons/catalog-icon';
import MailBulkIcon from '@patternfly/react-icons/dist/esm/icons/mail-bulk-icon';
import TwitterIcon from '@patternfly/react-icons/dist/esm/icons/twitter-icon';

const CommunityPage = () => (
    <PageSection variant={PageSectionVariants.light}>
        <div className="ws-community-page">
            <Title size="4xl" className="pf-u-mb-lg ws-page-title" headingLevel="h2">Community</Title>
            <p>At the core of PatternFly is our community of people—in other words, our Flyers. Together, we celebrate creativity and foster a sense of teamwork and unity.</p>

            <Grid sm={12} md={6} gutter="sm" className="pf-l-grid pf-m-all-12-col-on-sm pf-m-all-6-col-on-md pf-m-gutter pf-u-mt-3xl">
                <GridItem className="pf-u-pr-xl">
                    <img src={communityPageHeader} alt="Website collaboration" />
                </GridItem>
                <GridItem>
                    <Title size="3xl" className="ws-title" headingLevel="h3">Who we are</Title>
                    <p>We’re made of designers, developers, and other UX professionals with a passion for open source. We each have different ways of working with others and supporting the community—there’s no one way to be a Flyer. Whether we’re contributing to PatternFly or just staying up to date on new releases, we work together to make PatternFly a vibrant community of passionate people.</p>
                </GridItem>
            </Grid>

            <Title size="3xl" className="pf-u-mb-sm ws-page-title pf-u-mt-3xl" headingLevel="h3">What we're building</Title>
            <p>Our work extends beyond products and apps. We’re always exploring new ways we can welcome ideas and build better experiences for the very people who make PatternFly what it is today. </p>

            <Grid sm={12} md={4} className="pf-u-my-lg pf-l-grid pf-m-all-12-col-on-sm pf-m-all-4-col-on-md pf-u-text-align-center ws-building-grid">
                <GridItem>
                    <img src={community1} alt="Globe" className="ws-community-grid-img" />
                    <Title size="xl" className="ws-title" headingLevel="h4">Building global connections</Title>
                    <p>
                        Flyers may be spread all over the globe, but we make sure to come together once a month to share updates and collect feedback. All meetings are recorded and published on <a href="https://www.youtube.com/channel/UCqLT0IEvYmb8z__9IFLSVyQ">PatternFly’s YouTube channel</a>, and you can join PatternFly’s mailing list for the invites.
                    </p>
                    <Title size="xl" className="ws-title" headingLevel="h4">
                        <a href="https://www.redhat.com/mailman/listinfo/patternfly"><strong>Join our mailing list</strong></a>
                    </Title>
                </GridItem>
                <GridItem>
                    <img src={community2} alt="Map" className="ws-community-grid-img" />
                    <Title size="xl" className="ws-title" headingLevel="h4">Building PatternFly roadmaps</Title>
                    <p>
                        To stay on top of all changes and keep everyone informed, we regularly update PatternFly roadmaps. This gives us an opportunity to share what Flyers are working on and what updates we’re planning.
                    </p>
                    <Title size="xl" className="ws-title" headingLevel="h4">
                        <a href="https://github.com/orgs/patternfly/projects/4?fullscreen=true"><strong>Explore PatternFly roadmaps</strong></a>
                    </Title>
                </GridItem>
                <GridItem>
                    <img src={community3} alt="Figure of a person" className="ws-community-grid-img" />
                    <Title size="xl" className="ws-title" headingLevel="h4">Building accessible experiences</Title>
                    <p>
                        A community isn’t really a community unless everyone is included, so accessible UX is important to us. We regularly test and audit PatternFly’s accessibility and share guidance whenever we can.
                    </p>
                    <Title size="xl" className="ws-title" headingLevel="h4">
                        <Link to="/developer-resources/accessibility-guide">
                            <strong>Read our accessibility guide</strong>
                        </Link>
                    </Title>
                </GridItem>
            </Grid>

            <Title size="3xl" className="pf-u-mb-sm ws-page-title pf-u-mt-3xl" headingLevel="h3">Creating new communities</Title>
            <p>Sometimes Flyers branch out and build groups of their own, which is how new communities are born. While PatternFly communities are separate from PatternFly and not supported as part of the design system, we still love seeing our Flyers forming new groups and developing their visions into actions.</p>
            <br/>

            <Title size="xl" className="pf-u-mb-sm ws-page-title pf-u-mt-xl" headingLevel="h4"><a href="https://patternflyelements.org">PatternFly Elements</a></Title>
            <p> PatternFly Elements is a community created by Red Hat's web-based developers. It focuses on creating web components for use across Red Hat's sites and SaaS products and features theming options available for your own brand library.</p>

            <Title size="xl" className="pf-u-mb-sm ws-page-title pf-u-mt-xl" headingLevel="h4"><a href="https://github.com/patternfly-kotlin/patternfly-fritz2">PatternFly Fritz2</a></Title>
            <p>PatternFly Fritz2 is a Kotlin implementation of PatternFly based on fritz2 targeting Kotlin/JS. The goal of this project is to provide all PatternFly components in Kotlin. This is done in a way that matches the reactive nature of fritz2. In particular, the components use stores, handlers, and other elements from the fritz2 API. To get a quick overview what this is all about head over to the <a href="https://patternfly-kotlin.github.io/patternfly-fritz2-showcase/#home">PatternFly Fritz2 showcase</a>.</p>

            <Title size="4xl" className="pf-u-mb-lg ws-page-title ws-keep-growing pf-u-mt-3xl" headingLevel="h2">Let's keep growing</Title>
            <p>The PatternFly community is never finished growing, and we want to keep it that way. Feel free to reach out whenever — we’re always open.</p>

            <Grid sm={12} md={6} gutter="sm" className="pf-u-my-lg pf-l-grid pf-m-all-12-col-on-sm pf-m-all-6-col-on-md pf-m-gutter" style={{ maxWidth: '450px' }}>
                <GridItem>
                    <Split>
                        <SplitItem style={{ marginRight: '12px' }}><ChatIcon /></SplitItem>
                        <SplitItem isFilled>
                            <Title size="lg" className="ws-title" headingLevel="h4">Chat with us</Title>
                            <a href="//slack.patternfly.org/" target="_blank" rel="noopener noreferrer">Slack</a>
                        </SplitItem>
                    </Split>
                </GridItem>
                <GridItem>
                    <Split>
                        <SplitItem style={{ marginRight: '12px' }}><MailBulkIcon /></SplitItem>
                        <SplitItem isFilled>
                            <Title size="lg" className="ws-title" headingLevel="h4">Stay in the loop</Title>
                            <a href="//www.redhat.com/mailman/listinfo/patternfly" target="_blank" rel="noopener noreferrer">PatternFly mailing list</a>
                        </SplitItem>
                    </Split>
                </GridItem>
                <GridItem>
                    <Split>
                        <SplitItem style={{ marginRight: '12px' }}><QuestionIcon /></SplitItem>
                        <SplitItem isFilled>
                            <Title size="lg" className="ws-title" headingLevel="h4">Ask a question</Title>
                            <a href="//forum.patternfly.org/" target="_blank" rel="noopener noreferrer">PatternFly forum</a>
                        </SplitItem>
                    </Split>
                </GridItem>
                <GridItem>
                    <Split>
                        <SplitItem style={{ marginRight: '12px' }}><CatalogIcon /></SplitItem>
                        <SplitItem isFilled>
                            <Title size="lg" className="ws-title" headingLevel="h4">Read the latest</Title>
                            <a href="//medium.com/patternfly" target="_blank" rel="noopener noreferrer">PatternFly Medium</a>
                        </SplitItem>
                    </Split>
                </GridItem>
                <GridItem>
                    <Split>
                        <SplitItem style={{ marginRight: '12px' }}><TwitterIcon /></SplitItem>
                        <SplitItem isFilled>
                            <Title size="lg" className="ws-title" headingLevel="h4">Send us a Tweet</Title>
                            <a href="//twitter.com/patternfly" target="_blank" rel="noopener noreferrer">PatternFly Twitter</a>
                        </SplitItem>
                    </Split>
                </GridItem>
            </Grid>
        </div>
    </PageSection>
);

export default CommunityPage;
