const { parse } = require('../../helpers/acorn');

module.exports = {
  parseJSXAttributes: jsx => {
    // Patch until https://github.com/patternfly/patternfly/pull/3324 is in react-docs
    jsx = jsx.replace(/=(true|false)/g, (_, match) => `="${match}"`);
    const properties = {};
    const jsxAttributes = parse(jsx)
      .body[0]
      .expression
      .openingElement
      .attributes;

    jsxAttributes.forEach(attr => {
      properties[attr.name.name] = attr.value ? attr.value.value : true;
    });

    return properties;
  }
}
