const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = (_env, argv) => {
  const {
    pathPrefix = '',
    mode,
    algolia = {},
    hasGdprBanner = false,
    hasFooter = false,
    hasVersionSwitcher = false,
    hasDesignGuidelines = false,
    sideNavItems = [],
    topNavItems = [],
  } = argv;

  const isProd = mode === 'production';

  return {
    entry: path.resolve(__dirname, '../../app.js'),
    output: {
      publicPath: isProd ? `${pathPrefix}/` : '/',
      pathinfo: false, // https://webpack.js.org/guides/build-performance/#output-without-path-info,
      hashDigestLength: 8
    },
    amd: false, // We don't use any AMD modules, helps performance
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.[tj]sx?$/,
          include: [
            path.resolve(process.cwd(), 'src'),
            path.resolve(__dirname, '../..'), // Temporarily compile theme using webpack for development
            /react-[\w-]+\/src\/.*\/examples/
          ],
          exclude: [
            path.resolve(__dirname, '../../node_modules'), // Temporarily compile theme using webpack for development
          ],
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: '.cache/babel',
              cacheCompression: false,
              presets: [['@babel/preset-env', {
                loose: true,
                corejs: 3,
                useBuiltIns: 'entry',
                exclude: ['transform-regenerator', 'transform-async-to-generator'],
                modules: false
              }]],
              plugins: [
                '@babel/plugin-transform-react-jsx',
                '@babel/plugin-proposal-class-properties'
              ],
            }
          },
        },
        {
          test: /\.(png|jpe?g|webp)$/,
          use: {
            loader: 'responsive-loader',
            options: {
              adapter: require('responsive-loader/sharp'),
              name: '[name].[contenthash].[ext]',
              outputPath: 'images/'
            },
          }
        },
        {
          test: /\.(gif|svg)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
              outputPath: 'images/'
            },
          }
        },
        {
          test: /\.(pdf)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash].[ext]',
            }
          }
        },
        {
          test: /.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
      ]
    },
    resolve: {
      // Allow importing client routes
      alias: {
        'client-styles': path.resolve(process.cwd(), 'patternfly-docs.css.js'),
        './routes-client': path.resolve(process.cwd(), 'patternfly-docs.routes.js'),
        './routes-generated': path.resolve(process.cwd(), 'src/generated/index.js'),
        'lodash': 'lodash-es' // Sanely bundle react-charts.
      },
      modules: [
        'node_modules',
        ...module.paths,
      ]
    },
    // Use this module's node_modules first (for use in Core/React workspaces)
    resolveLoader: {
      modules: module.paths,
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.pathPrefix': JSON.stringify(isProd ? pathPrefix : ''),
        'process.env.algolia': JSON.stringify(algolia),
        'process.env.hasGdprBanner': JSON.stringify(hasGdprBanner),
        'process.env.hasFooter': JSON.stringify(hasFooter),
        'process.env.hasVersionSwitcher': JSON.stringify(hasVersionSwitcher),
        'process.env.hasDesignGuidelines': JSON.stringify(hasDesignGuidelines),
        'process.env.sideNavItems': JSON.stringify(sideNavItems),
        'process.env.topNavItems': JSON.stringify(topNavItems),
        'process.env.prnum': JSON.stringify(process.env.CIRCLE_PR_NUMBER || process.env.PR_NUMBER || ''),
        'process.env.prurl': JSON.stringify(process.env.CIRCLE_PULL_REQUEST || ''),
      }),
      new FaviconsWebpackPlugin({
        logo: path.resolve(__dirname, '../../images/patternfly-logo.svg'),
        favicons: {
          appDescription: 'Home of PatternFly Design.',
          cache: true,
          background: '#4F5255',
          theme_color: '#151515',
          icons: {
            android: true,
            appleIcon: true,
            appleStartup: false,
            coast: false,
            favicons: true,
            firefox: false,
            windows: false,
            yandex: false
          },
          start_url: '/'
        }
      }),
      new MonacoWebpackPlugin(),
      ...(isProd
        ? [
          new CleanWebpackPlugin()
        ]
        : []
      )
    ],
    stats: 'minimal'
  };
}
