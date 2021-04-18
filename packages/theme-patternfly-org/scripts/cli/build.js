const path = require('path');
const { fork } = require('child_process');
const webpack = require('webpack');
const { generate } = require('./generate');
const { getConfig } = require('./helpers');

async function buildWebpack(webpackConfig) {
  let compiler;
  try {
    compiler = webpack(webpackConfig);
  } catch (err) {
    if (err.name === "WebpackOptionsValidationError") {
      console.error(err.message);
      process.exit(1);
    }

    throw err;
  }

  return new Promise((res, rej) => 
    compiler.run((err, stats) => {
      if (err) {
        console.error(err.stack || err);
        if (err.message) {
          console.error(err.message);
        }
        rej();
      }
    
      console.log(stats.toString());
      if (stats.hasErrors()) {
        rej();
      }

      res();
    })
  );
}

async function execFile(file, args) {
  const start = new Date();
  return new Promise((res, _rej) => {
    const child = fork(path.join(__dirname, file), args);
    function errorHandler(err) {
      console.error(err);
      process.exit(1);
    };
    function successHandler(code) {
      if (code === 0) {
        const duration = new Date() - start;
        console.log('%s took %ss', file, duration / 1000);
        res();
      }
      else {
        process.exit(code);
      }
    }
    child.on('error', errorHandler);
    child.on('exit', successHandler);
  });
}

async function build(cmd, options) {
  generate(options);
  const toBuild = cmd === 'all'
    ? ['server', 'client']
    : cmd;
  const config = getConfig(options);
  config.analyze = options.analyze;

  // These get passed to `fork`ed builds
  process.env.pathPrefix = config.pathPrefix;
  process.env.hasDesignGuidelines = config.hasDesignGuidelines;
  // console.log('build', cmd, options.parent.cssconfig);
  if (toBuild.includes('server')) {
    // Need to fork since first webpack build puts pressure on GC
    // Otherwise CircleCI will fail with 4GB RAM
    await execFile('buildServer.js', [JSON.stringify(config)]);
  }
  if (toBuild.includes('client')) {
    await execFile('buildClient.js', [JSON.stringify(config)]);
  }
}

module.exports = {
  build,
  buildWebpack
};
