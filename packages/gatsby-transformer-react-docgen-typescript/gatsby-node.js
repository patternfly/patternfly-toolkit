const reactDocgen = require('react-docgen');
const ts = require('typescript');

function isSource(node) {
  if (!node || node.relativePath.includes('/example'))
    return false;

  return true;
}

function isComponentCode(node) {
  return node && (isTSX(node) || isJSX(node)) && isSource(node);
}

function isTSX(node) {
  return (
    node.internal.mediaType === `application/typescript` ||
    node.internal.mediaType === `text/tsx` ||
    node.extension === 'tsx'
  );
}

function isJSX(node) {
  return node.internal.mediaType === `application/javascript` || node.internal.mediaType === `text/jsx`;
}

console.log("you are here")

function flattenProps(props) {
  const res = [];
  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      value.name = key;
      res.push(value);
    });
  }

  return res;
}

const annotations = [
  {
    regex: /@deprecated/,
    name: 'deprecated',
    type: 'Boolean'
  },
  {
    regex: /@hide/,
    name: 'hide',
    type: 'Boolean'
  },
  {
    regex: /@beta/,
    name: 'beta',
    type: 'Boolean'
  },
  {
    regex: /@propType (\w+|['"](.+)['"])\s*/,
    name: 'annotatedType',
    type: 'String'
  },
];

function addAnnotations(prop) {
  // Prop looks like this: {
  //   "beta": null,
  //   "required": false,
  //   "name": "className",
  //   "description": "Additional css classes",
  //   "defaultValue": {
  //     "value": "''"
  //   },
  //   "tsType": {
  //     "name": "string",
  //     "raw": null
  //   },
  //   "type": null
  // },
  if (prop.description) {
    annotations.forEach(({ regex, name }) => {
      const match = prop.description.match(regex);
      if (match) {
        console.log(prop.description.replace(regex, ''))
        prop.description = prop.description.replace(regex, '').trim();
        prop[name] = match[2] || match[1] || true;
      }
    })
  }

  return prop;
}


function getComponentMetadata(node, sourceText) {
  let parsedComponents = null;
  try {
    parsedComponents = reactDocgen.parse(
      sourceText,
      reactDocgen.resolver.findAllExportedComponentDefinitions,
      null,
      { filename: node.absolutePath }
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    // console.warn('No component found in', node.absolutePath);
  }

  const interfaces = getInterfaceMetadata(node, sourceText);

  (parsedComponents || [])
    // .filter(parsed => parsed && parsed.displayName) // TabContent.tsx is being a pain so check for parsed.displayName
    .concat(interfaces) 
    .forEach(parsed => {
      // TODO: also find interfaces it extends to map back to interface metadata in other files
      // OR have it added as a `propComponent` in the MD file and just make a new table
      const metadataNode = {
        name: parsed.displayName,
        relativePath: node.relativePath,
        description: parsed.description,
        props: flattenProps(parsed.props).map(addAnnotations),
        path: node.relativePath,
        basePath: node.relativePath.split('/')[0],
        id: createNodeId(`${node.id}react-docgen${node.relativePath}`),
        children: [],
        parent: node.id,
        internal: {
          contentDigest: createContentDigest(node),
          type: `ComponentMetadata`
        }
      };
      actions.createNode(metadataNode);
      actions.createParentChildLink({ parent: node, child: metadataNode });
    });
    return (parsedComponents || []).filter(parsed => parsed && parsed.displayName);
}

function getInterfaceMetadata(fileNode, sourceText) {
  const ast = ts.createSourceFile(
    fileNode.absolutePath,   // fileName
    sourceText,
    ts.ScriptTarget.Latest // langugeVersion
  );
  
  function getText(node) {
    return sourceText.substring(node.pos, node.end);
  }

  const interfaces = [];
  
  ast.statements
    .filter(statement => statement.kind === ts.SyntaxKind.InterfaceDeclaration)
    .forEach(statement => {
      console.log('interface', statement.name.escapedText);
  
      // TODO: Create nodes
      const props = statement.members.map(member => ({
        name: member.name.escapedText,
        description: member.jsDoc
          ? member.jsDoc.map(doc => doc.comment).join('\n')
          : null,
        required: member.questionToken === undefined,
        type: getText(member.type).trim()
      }));
      interfaces.push({
        name: statement.name.escapedText,
        props
      });
    });
    // console.log(interfaces);
    return interfaces;
}

console.log("hello")

// Docs https://www.gatsbyjs.org/docs/actions/#createNode
async function onCreateNode({ node, actions, loadNodeContent, createNodeId, createContentDigest }) {
  if (!isComponentCode(node)) return;

  const sourceText = await loadNodeContent(node);
  // const theNodeID = await createNodeId(node);
  const componentMeta = getComponentMetadata(node, sourceText);
  const interfaceMeta = getInterfaceMetadata(node, sourceText);

  componentMeta
    .concat(interfaceMeta) 
    .forEach(parsed => {
      // TODO: add an interface as a `propComponent` in an MD file
      const metadataNode = {
        name: parsed.displayName,
        relativePath: node.relativePath,
        description: parsed.description,
        props: flattenProps(parsed.props).map(addAnnotations),
        path: node.relativePath,
        basePath: node.relativePath.split('/')[0],
        id: createNodeId(`${node.id}react-docgen${node.relativePath}`),
        children: [],
        parent: node.id,
        internal: {
          contentDigest: createContentDigest(node),
          type: `ComponentMetadata`
        }
      };
      actions.createNode(metadataNode);
      actions.createParentChildLink({ parent: node, child: metadataNode });
    });
  // console.log(sourceText)

}

exports.onCreateNode = onCreateNode;

// Add types fetched in `mdx.js` query in case no files are passed to infer from
exports.createSchemaCustomization = ({ actions }) => {
  const typeDefs = `
    type TypeType @noInfer {
      name: String
    }
    type TsType @noInfer {
      name: String
      raw: String
    }
    type defaultValue @noInfer {
      value: String
    }
    type PropsType @noInfer {
      beta: Boolean
      name: String!
      description: String
      required: Boolean
      type: TypeType
      tsType: TsType
      defaultValue: defaultValue
      ${annotations.map(({ name, type }) => `${name}: ${type}`).join('\n')}
    }
    type ComponentMetadata implements Node @noInfer {
      name: String!
      description: String
      props: [PropsType]
    }
  `;
  actions.createTypes(typeDefs);
}
