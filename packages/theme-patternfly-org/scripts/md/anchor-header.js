const visit = require('unist-util-visit');
const toText = require('hast-util-to-text')
const { slugger } = require('../../helpers/slugger');
const { liveCodeTypes } = require('../../helpers/liveCodeTypes');

// This transforms headers in markdown to AutoLinkHeader JSX components
function anchorHeader(tocCallback) {
  return tree => {
    const ids = {};
    const toc = [];
    const addTOCItem = (tocItem, level) => {
      if (level === 'h2') {
        toc.push(tocItem);
      }
      else if (level === 'h3') {
        // Only need to support up to h3s, so this array structure works fine
        const lastTOC = toc[toc.length - 1];
        if (Array.isArray(lastTOC)) {
          lastTOC.push(tocItem);
        }
        else {
          toc.push([tocItem]);
        }
      }
    }
    visit(tree, 'element', node => {
      if (node.tagName.match(/h\d/)) {
        // Add a unique id for auto link headers
        const text = toText(node);
        node.properties.id = node.properties.id || slugger(text);
        const idNum = ids[node.properties.id];
        const tocItem = { text };
        if (idNum !== undefined) {
          ids[node.properties.id] += 1;
          node.properties.id += `-${idNum}`;
          // Only add id if its not === `slugger(text)` to save some bandwidth
          tocItem.id = node.properties.id;
        }
        else {
          ids[node.properties.id] = 0;
        }
        // Add to TOC for indexing
        addTOCItem(tocItem, node.tagName);

        node.properties.size = node.tagName;
        node.properties.className = node.properties.className || '';
        node.properties.className += node.properties.className ? ' ' : '';
        node.properties.className += `ws-title ws-${node.tagName}`;
        node.tagName = 'AutoLinkHeader';
      }
      else if (
        node.tagName === 'Example'
        && liveCodeTypes.includes(node.properties.lang)
        && !node.properties.noLive
      ) {
        addTOCItem(
          {
            text: node.title
          },
          'h3'
        );
      }
    });

    tocCallback(toc);
  }
}

module.exports = anchorHeader;
