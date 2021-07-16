const { generate, baseGenerator } = require('astring');
const { parse } = require('./acorn');

const commonGenerator = {
  ...baseGenerator,
  // Strip types
  TSTypeAnnotation() {},
  TSTypeReference() {},
  TSLiteralType() {},
  TSTupleType() {},
  TSOptionalType() {},
  TSRestType() {},
  TSArrayType() {},
  TSIndexedAccessType() {},
  TSFunctionType() {},
  TSParenthesizedType() {},
  TSUnionType() {},
  TSIntersectionType() {},
  TSConditionalType() {},
  TSInferType() {},
  TSImportType() {},
  TSQualifiedName() {},
  TSConstructorType() {},
  TSConstructSignatureDeclaration() {},
  TSTypeLiteral() {},
  TSTypeAliasDeclaration() {},
  TSInterfaceBody() {},
  TSInterfaceDeclaration() {},
  TSExpressionWithTypeArguments() {},
  TSTypeParameter() {},
  TSTypeParameterDeclaration() {},
  TSTypeParameterInstantiation() {},
  TSMethodSignature() {},
  TSPropertySignature() {},
  TSIndexSignature() {},
  TSMappedType() {},
  TSTypeParameter() {},
  TSAsExpression() {},
  TSNonNullExpression() {},
  // Class features
  FieldDefinition(node, state) {
    this[node.key.type](node.key, state);
    state.write(' = ');
    this[node.value.type](node.value, state);
    state.write(';');
  },
  PropertyDefinition(node, state) {
    this.FieldDefinition(node, state);
  },
};

// Stringify ES2017 TSX w/class members -> ES2017 w/o imports/exports so it can be `eval`ed
const es2017Generator = {
  ...commonGenerator,
  JSXElement(node, state) {
    state.write('React.createElement(');
    this.JSXOpeningElement(node.openingElement, state);
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      if (child.type !== 'JSXText') {
        state.write(',');
      }
      this[child.type](child, state);
    }
    state.write(')');
  },
  JSXOpeningElement(node, state) {
    this[node.name.type](node.name, state, node.name.name && node.name.name[0] === node.name.name[0].toLowerCase());
    state.write(',{');
    for (var i = 0; i < node.attributes.length; i++) {
      var attr = node.attributes[i];
      this[attr.type](attr, state);
      if (i !== node.attributes.length - 1) {
        state.write(',');
      }
    }
    state.write('}');
  },
  JSXIdentifier(node, state, escape) {
    if (escape) {
      state.write(JSON.stringify(node.name));
    }
    else {
      state.write(node.name);
    }
  },
  JSXMemberExpression(node, state) {
    this[node.object.type](node.object, state);
    state.write('.');
    this[node.property.type](node.property, state);
  },
  JSXAttribute(node, state) {
    this[node.name.type](node.name, state, true);
    state.write(':');
    if (node.value) {
      this[node.value.type](node.value, state);
    }
    else {
      state.write('true');
    }
  },
  JSXExpressionContainer(node, state) {
    this[node.expression.type](node.expression, state);
  },
  JSXText(node, state) {
    if (node.value.trim() === '') {
      node.value = null;
    }
    if (node.value) {
      state.write(',"');
      state.write(node.value.replace(/"/g, '\\"').replace(/\n\s*/g, ' '));
      state.write('"');
    }
  },
  JSXSpreadAttribute(node, state) {
    state.write('...(');
    if (node.argument.type === 'LogicalExpression') {
      this[node.argument.left.type](node.argument.left, state);
      state.write(' ');
      state.write(node.argument.operator);
      state.write(' ');
      this[node.argument.right.type](node.argument.right, state);
    }
    else {
      this[node.argument.type](node.argument, state);
    }
    state.write(')');
  },
  JSXFragment(node, state) {
    this.JSXElement({
      openingElement: {
        attributes: [],
        name: {
          type: 'JSXIdentifier',
          name: 'React.Fragment'
        }
      },
      children: node.children
    }, state);
  },
  JSXEmptyExpression(_node, state) {
    state.write('null');
  },
};

// Stringify ES2017 TSX w/class members -> ES2017 JSX w/class members
const es2017GeneratorJSX = {
  ...commonGenerator,
  // <div></div>
  JSXElement(node, state) {
    state.write('<');
    this[node.openingElement.type](node.openingElement, state);
    if (node.closingElement) {
      state.write('>');
      for (var i = 0; i < node.children.length; i++) {
        var child = node.children[i];
        this[child.type](child, state);
      }
      state.write('</');
      this[node.closingElement.type](node.closingElement, state);
      state.write('>');
    } else {
      state.write(' />');
    }
  },
  // <div>
  JSXOpeningElement(node, state) {
    this[node.name.type](node.name, state);
    for (var i = 0; i < node.attributes.length; i++) {
      var attr = node.attributes[i];
      this[attr.type](attr, state);
    }
  },
  // </div>
  JSXClosingElement(node, state) {
    this[node.name.type](node.name, state);
  },
  // div
  JSXIdentifier(node, state) {
    state.write(node.name);
  },
  // Member.Expression
  JSXMemberExpression(node, state) {
    this[node.object.type](node.object, state);
    state.write('.');
    this[node.property.type](node.property, state);
  },
  // attr="something"
  JSXAttribute(node, state) {
    state.write(' ');
    this[node.name.type](node.name, state);
    state.write('=');
    this[node.value.type](node.value, state);
  },
  // namespaced:attr="something"
  JSXNamespacedName(node, state) {
    this[node.namespace.type](node.namespace, state);
    state.write(':');
    this[node.name.type](node.name, state);
  },
  // {expression}
  JSXExpressionContainer(node, state) {
    state.write('{');
    this[node.expression.type](node.expression, state);
    state.write('}');
  },
  // anything between JSX nodes
  JSXText(node, state) {
    state.write(node.value);
  },
  // {...props}
  JSXSpreadAttribute(node, state) {
    state.write('...(');
    if (node.argument.type === 'LogicalExpression') {
      this[node.argument.left.type](node.argument.left, state);
      state.write(' ');
      state.write(node.argument.operator);
      state.write(' ');
      this[node.argument.right.type](node.argument.right, state);
    }
    else {
      this[node.argument.type](node.argument, state);
    }
    state.write(')');
  },
  // <></>
  JSXFragment(node, state) {
    this.JSXElement({
      openingElement: {
        attributes: [],
        name: {
          type: 'JSXIdentifier',
          name: 'React.Fragment'
        }
      },
      children: node.children
    }, state);
  },
  // {} (not very kosher)
  JSXEmptyExpression(_node, state) {
    state.write('{}');
  },
};

// ES2017 TSX w/class members -> ES2017 React Component
function convertToReactComponent(code) {
  const ast = parse(code);

  // Modify AST for function creation
  ast.body = ast.body.filter(node => !['ImportDeclaration', 'ExportAllDeclaration'].includes(node.type));
  for (let i = 0; i < ast.body.length; i++) {
    if (['ExportNamedDeclaration', 'ExportDefaultDeclaration'].includes(ast.body[i].type)) {
      // Replace exports
      ast.body[i] = ast.body[i].declaration;
    }
  }

  // Create Function that returns React Component
  // Create React component by returning last member of body
  let lastStatement = ast.body[ast.body.length - 1];
  // Convert `const Example` to `Example`
  if (lastStatement.type === 'VariableDeclaration') {
    const { declarations } = lastStatement;
    if (declarations.length !== 1) {
      throw new Error('The last example variable declaration must be a single expression.');
    }
    const declaration = declarations[0];
    lastStatement = {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: declaration.id,
        right: declaration.init
      }
    };
  }
  // Convert `<InlineJSX />` or `Example = () => <InlineJSX />`
  // to `function PreviewComponent() { return <InlineJSX />; }`
  if (lastStatement.type === 'ExpressionStatement' && lastStatement.expression.type === 'JSXElement') {
    ast.body = [{
      type: 'ReturnStatement',
      argument: {
        type: 'FunctionDeclaration',
        id: {
          type: 'Identifier',
          name: 'PreviewComponent'
        },
        body: {
          type: 'BlockStatement',
          body: [
            ...ast.body.slice(0, ast.body.length - 1),
            {
              type: 'ReturnStatement',
              argument: lastStatement
            }
          ]
        }
      }
    }];
  } else {
    ast.body = [
      ...ast.body.slice(0, ast.body.length - 1),
      {
        type: 'ReturnStatement',
        argument: lastStatement
      }
    ];
  }

  //console.log(ast)
  code = generate(ast, { generator: es2017Generator }).trim();
  //console.log(code)
  return { code, hasTS: ast.sourceType === 'ts' };
}

// ES2017 TSX w/class members -> ES2017 JSX
function convertToJSX(code) {
  const ast = parse(code);
  code = generate(ast, { generator: es2017GeneratorJSX }).trim();
  return { code, hasTS: false };
}

module.exports = {
  convertToReactComponent,
  convertToJSX
};

