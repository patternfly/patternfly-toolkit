const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

const serverConfig = () => {
  return {
    output: {
      path: path.resolve('.cache/ssr-build'), // Don't bloat `public` dir
			libraryTarget: 'commonjs2' // Use module.exports
    },
    target: 'node', // Load chunks using require
    devtool: false,
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
      minimize: false // Faster build, easier debugging
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: 'null-loader'
        },
        // This does weird things to document
        {
          test: /(novnc-core|@novnc[\\/]novnc)[\\/].*\.js/,
          use: 'null-loader'
        }
      ]
    },
    resolve: {
      alias: {
        // This stops prerender from hanging in `yarn build:client`
        'd3-timer': 'theme-patternfly-org/helpers/d3-timer',
        // The maintainer will not allow his bundle to be required from a node context
        // https://github.com/xtermjs/xterm.js/pull/3134
        'xterm':  'theme-patternfly-org/helpers/xterm',
        'xterm-addon-fit':  'theme-patternfly-org/helpers/xterm-addon-fit',
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.PRERENDER': JSON.stringify(true) // In app.js don't call ReactDOM.render
      }),
    ],
    // Load in prerender.js instead
    externals: ['react', 'react-dom', '@reach/router']
  };
}

module.exports = (env = {}, argv) => merge(
  baseConfig(env, argv),
  serverConfig(env, argv)
);
