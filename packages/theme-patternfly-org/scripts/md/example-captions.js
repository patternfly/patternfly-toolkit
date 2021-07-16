const visit = require('unist-util-visit');
const remove = require('unist-util-remove');
const { parseJSXAttributes } = require('./jsxAttributes');
const { liveCodeTypes } = require('../../helpers/liveCodeTypes');

function isExample(node, file) {
  if (node.type !== 'code' || !liveCodeTypes.includes(node.lang)) {
    return false;
  }
  if (node.meta) {
    let properties = {};
    try {
      Object.entries(parseJSXAttributes(`<Component ${node.meta} />`))
        .forEach(([key, val]) => {
          properties[key] = val;
        }); 
    }
    catch (error) {
      file.fail(`Error parsing "${node.meta}": ${error}`);
    }
    if (properties.noLive) {
      return false;
    }
  }

  return true;
}

function exampleCaptions() {
  return (tree, file) => {
    visit(tree, node => isExample(node, file), (node, _index, parent) => {
      let title = 'Untitled example';
      let caption = [];

      // Starting from node, look up for h3s
      let startLooking = false;
      for(let i = parent.children.length - 1; i > 0; i--) {
        const child = parent.children[i];
        if (child === node) {
          startLooking = true;
        }
        else if (startLooking) {
          if (
            child.type === 'heading' &&
            child.depth === 3 &&
            child.children && 
            child.children[0].value
          ) {
            title = child.children[0].value;
            child.needsDeletion = true;
            break;
          }
          else {
            caption.unshift(Object.assign({}, child));
            child.needsDeletion = true;
          }
        }
      }

      node.title = title;
      node.children = caption;
    });
    remove(tree, node => node.needsDeletion);
  }
}

module.exports = exampleCaptions;
