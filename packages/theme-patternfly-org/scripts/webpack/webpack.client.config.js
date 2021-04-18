const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.config');
const { getHtmlWebpackPlugins } = require('./getHtmlWebpackPlugins');
const EagerImportsPlugin = require('eager-imports-webpack-plugin').default;

let pfDir;
try {
  pfDir = path.dirname(require.resolve('@patternfly/patternfly/package.json'));
}
catch {
  // Inside core workspace
  pfDir = path.join(process.cwd(), 'dist');
}
const staticDir = path.join(process.cwd(), 'static/');
// Don't include PatternFly styles twice
const reactCSSRegex = /(react-[\w-]+[\\/]dist|react-styles[\\/]css)[\\/].*\.css$/;
const reactJSRegex = /react-([^\\/]*)[\\/]dist[\\/](esm|js)[\\/].*\.js$/

const clientConfig = async (env, argv) => {
  const isProd = argv.mode === 'production';
  const isAnalyze = env === 'analyze';

  return {
    output: {
      path: path.resolve('public'),
      filename: isProd ? '[name].[contenthash].bundle.js' : '[name].bundle.js'
    },
    devServer: {
      hot: false,
      historyApiFallback: true,
      port: argv.port
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        // https://webpack.js.org/plugins/mini-css-extract-plugin/#extracting-all-css-in-a-single-file
        cacheGroups: {
          vendorStyles: {
            test: /[\\/]node_modules[\\/].*\.css$/,
            name: 'vendorStyles',
            priority: 10
          },
          mainStyles: {
            test: /\.css$/,
            name: 'mainStyles',
            priority: 9
          },
          // This speeds up reloads 2x in React and doesn't affect org's reload times
          patternfly: {
            test: reactJSRegex,
            name(module, _chunks, cacheGroupKey) {
              const package = module.identifier().match(reactJSRegex)[1];
              return `${cacheGroupKey}-${package}`;
            },
            reuseExistingChunk: true,
            priority: 5
          },
          monacoEditor: {
            test: /[\\/]node_modules[\\/]monaco-editor/,
            name: 'monacoEditor',
            enforce: true,
            reuseExistingChunk: true,
            priority: 4
          },
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'defaultVendors',
            enforce: true,
            reuseExistingChunk: true,
            priority: 3
          },
        },
      },
      minimize: isProd ? true : false,
      minimizer: [
        new TerserPlugin({
          ...(process.env.CI ? { parallel: 2 } : {})
        }),
      ],
      runtimeChunk: 'single',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: reactCSSRegex,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    require('autoprefixer')({
                      env: '>1%, not ie 11, not op_mini all',
                      flexbox: false,
                      grid: false
                    })
                  ]
                }
              }
            }
          ]
        },
        {
          test: reactCSSRegex,
          use: 'null-loader'
        },
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PRERENDER': JSON.stringify(false),
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? '[name].[contenthash].css' : '[name].css',
        chunkFilename: isProd ? '[name].[contenthash].css' : '[name].css',
      }),
      new CopyPlugin({
        patterns: [
          // versions.json will later be copied to the root www dir
          { from: path.join(__dirname, '../../versions.json'), to: 'versions.json' },
          { from: path.join(__dirname, '../../static'), to: '' }, // favicons
          { from: path.join(pfDir, 'assets/images/'), to: 'assets/images/' },
          ...(fs.existsSync(staticDir) ? [{ from: staticDir, to: '' }] : [])
        ]
      }),
      // Create an HTML page per route
      ...await getHtmlWebpackPlugins({ isProd: isProd && !isAnalyze, ...argv }),
      ...(isProd ? [] : [new EagerImportsPlugin()]),
      ...(isAnalyze
        ? [
          new BundleAnalyzerPlugin({
            generateStatsFile: true,
            statsFilename: 'webpack.stats.json'
          })
        ]
        : [])
    ]
  };
}

// https://webpack.js.org/configuration/configuration-types/#exporting-a-promise
module.exports = async (env = {}, argv) => merge(
  baseConfig(env, argv),
  await clientConfig(env, argv)
);
