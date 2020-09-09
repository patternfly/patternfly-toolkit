#!/usr/bin/env node
const path = require('path');
const { program } = require('commander');
const { version } = require('../../package.json');
const { build } = require('./build');
const serverConfig = require('../webpack/webpack.server.config');
const clientConfig = require('../webpack/webpack.client.config');

function getConfig(options) {
  return require(path.join(process.cwd(), options.parent.config))
}

function getSource(options) {
  return require(path.join(process.cwd(), options.parent.source))
}

function generate(options) {
  console.log('write source files to src/generated');
  getSource(options);
}

program
  .version(version)
  .option('-c, --config <path>', 'set config path', './patternfly-docs.config.js')
  .option('-css, --cssconfig <path>', 'set css import file path', './patternfly-docs.css.js')
  .option('-s, --source <path>', 'set source generation file path', './patternfly-docs.source.js');

program
  .command('start')
  .description('generates source files and runs webpack-dev-server')
  .action((env, options) => {
    console.log('start', env, options);
  });
 
program
  .command('build <server|client|all>')
  .description('generates source files and runs webpack')
  .action(async (cmd, options) => {
    const config = getConfig(options);
    generate(options);
    const toBuild = cmd === 'all'
      ? ['server', 'client']
      : cmd;
    // console.log('build', cmd, options.parent.cssconfig);
    if (toBuild.includes('server')) {
      console.log('load server webpack config');
      const webpackServerConfig = await serverConfig(null, { mode: 'production' });
      console.log('build server');
      await build(webpackServerConfig);
    }
    if (toBuild.includes('client')) {
      console.log('load client webpack config');
      const webpackClientConfig = await clientConfig(null, { mode: 'production' });
      console.log('build client');
      await build(webpackClientConfig);
    }
  });

program.parse(process.argv);
