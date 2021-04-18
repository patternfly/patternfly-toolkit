# patternfly-org

The PatternFly Org is the source for the official documentation for PatternFly 3 and PatternFly 4.

## Development

Development setup requires yarn. If you do not already have yarn installed on your system, see https://yarnpkg.com/en/.

### Live Reload Server
#### v4 site
You can install the NPM dependencies with:

    yarn install

A local development server at http://localhost:8003 can be started with:

    yarn start

#### v3 site
You can install the NPM dependencies with:

    yarn install

And the Ruby dependencies with:

    cd packages/v3
    bundle install

An old grunt development server for v3 at http://localhost:9002 can then be started with:

    yarn start:v3

### Build

The new v4 site can be built with:

    yarn build:v4

The old v3 [Jekyll](http://jekyllrb.com/) site can be built with:

    yarn build:v3

The static assets get copied to build/patternfly-org.

### Deploy

When you submit a PR, previews should be automatically generated for you and uploaded as PR comments. This takes between 5-10 minutes.

When the PR is merged to master, the site is first deployed to a [staging S3 bucket.](https://staging.patternfly.org)

When PatternFly does a release (currently every 3 weeks) this bucket is copied to https://patternfly.org.

### Old submodules

You might have a dirty file tree with old submodules and folders lying around. You can remove these with:

    git clean -dfx

