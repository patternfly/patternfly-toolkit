const { Parser } = require('acorn');
const jsx = require('acorn-jsx');
const staticClassFeatures = require('acorn-static-class-features');
const classFields = require('acorn-class-fields');
const typescript = require('./acorn-typescript');

const jsxParser = Parser.extend(typescript, jsx(), classFields, staticClassFeatures);

module.exports = {
  parse(code) {
    return jsxParser.parse(code, {
      ecmaVersion: 2018,
      sourceType: 'module',
      allowReturnOutsideFunction: true
    });
  }
};
