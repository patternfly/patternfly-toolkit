const acorn = require('acorn')
const tt = acorn.tokTypes

const tsPredefinedType = {
  any: 'TSAnyKeyword',
  bigint: 'TSBigIntKeyword',
  boolean: 'TSBooleanKeyword',
  never: 'TSNeverKeyword',
  null: 'TSNullKeyword',
  number: 'TSNumberKeyword',
  object: 'TSObjectKeyword',
  string: 'TSStringKeyword',
  symbol: 'TSSymbolKeyword',
  undefined: 'TSUndefinedKeyword',
  unknown: 'TSUnknownKeyword',
  void: 'TSVoidKeyword'
}

const tsDeclaration = {
  interface: 1,
  type: 2,
  enum: 4,
  declare: 8
}

const tsTypeOperator = {
  typeof: 1,
  keyof: 2,
  infer: 4
}

const tsExprMarkup = {
  as: 1,
  '!': 2
}

module.exports = Parser => class TSParser extends Parser {
  constructor(...args) {
    super(...args)
    // Allow 'interface'
    this.reservedWords = /^(?:enum)$/
    this.reservedWordsStrict = this.reservedWords
  }

  finishNode(node, type) {
    if (type.startsWith('TS')) {
      // Hack to not need acorn-walk to detect TS
      this.options.sourceType = 'ts';
    }
    return this.finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
  }

  computeLocByOffset(offset) {
    // If `locations` option is off, do nothing for saving performance.
    if (this.options.locations) {
      return acorn.getLineInfo(this.input, offset)
    }
  }

  startNodeAtNode(node) {
    return this.startNodeAt(node.start, this.computeLocByOffset(node.start))
  }

  tsPreparePreview() {
    const {
      pos, curLine, type, value, end, start, endLoc, startLoc, scopeStack,
      lastTokStartLoc, lastTokEndLoc, lastTokEnd, lastTokStart, context,
    } = this
    return () => {
      this.pos = pos
      this.curLine = curLine
      this.type = type
      this.value = value
      this.end = end
      this.start = start
      this.endLoc = endLoc
      this.startLoc = startLoc
      this.scopeStack = scopeStack
      this.lastTokStartLoc = lastTokStartLoc
      this.lastTokEndLoc = lastTokEndLoc
      this.lastTokEnd = lastTokEnd
      this.lastTokStart = lastTokStart
      this.context = context
    }
  }

  _isStartOfTypeParameters() {
    return this.type === tt.relational && this.value.charCodeAt(0) === 60 // <
  }

  _isEndOfTypeParameters() {
    return this.type === tt.relational && this.value.charCodeAt(0) === 62 // >
  }

  _hasPrecedingLineBreak() {
    return acorn.lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
  }

  // Studied from Babel
  parseExpressionStatement(node, expr) {
    return expr.type === 'Identifier'
      ? this._parseTSDeclaration(node, expr)
      : super.parseExpressionStatement(node, expr)
  }

  parseBindingAtom() {
    const node = super.parseBindingAtom()
    if (this.eat(tt.colon)) {
      node.typeAnnotation = this.parseTSTypeAnnotation(false)
      node.end = node.typeAnnotation.end
      if (this.options.locations) {
        node.loc.end = node.typeAnnotation.loc.end
      }
    }
    return node
  }

  parseMaybeDefault(startPos, startLoc, left) {
    if (!left) {
      left = this.parseBindingAtom()
      if (this.eat(tt.question)) {
        left.optional = true
      }
      // `parseBindingAtom` is executed,
      // so we need to check type annotation again.
      if (this.eat(tt.colon)) {
        left.typeAnnotation = this.parseTSTypeAnnotation(false)
        left.end = left.typeAnnotation.end
        if (this.options.locations) {
          left.loc.end = left.typeAnnotation.loc.end
        }
      }
    }
    return super.parseMaybeDefault(startPos, startLoc, left)
  }

  parseMaybeAssign(noIn, refDestructuringErrors, afterLeftParse) {
    let node = super.parseMaybeAssign(
      noIn,
      refDestructuringErrors,
      afterLeftParse
    )
    node = this._parseMaybeTSExpression(node)
    return node
  }

  parseFunctionParams(node) {
    node.typeParameters = this.parseMaybeTSTypeParameterDeclaration()
    return super.parseFunctionParams(node)
  }

  parseFunctionBody(node, isArrowFunction) {
    // I know, return type doesn't belong to function body,
    // but this will be less hacky.
    if (this.eat(tt.colon)) {
      node.returnType = this.parseTSTypeAnnotation(false)
    }
    super.parseFunctionBody(node, isArrowFunction)
  }

  parseExpression() {
    const parenthesized = this.type === tt.parenL,
      parenStart = parenthesized ? this.start : -1
    let expr = super.parseExpression()

    if (parenthesized) {
      expr.extra = { parenthesized, parenStart }
      return expr
    }

    expr = this._parseMaybeTSExpression(expr)
    return expr
  }

  parseParenItem(item) {
    item = super.parseParenItem(item)
    item = this._parseMaybeTSExpression(item)
    return item
  }

  // https://github.com/acornjs/acorn/blob/master/acorn/src/statement.js#L569
  parseClass(node, isStatement) {
    this.next()

    // ecma-262 14.6 Class Definitions
    // A class definition is always strict mode code.
    const oldStrict = this.strict
    this.strict = true

    this.parseClassId(node, isStatement)
    this.parseClassSuper(node)
    const privateNameMap = this.enterClassBody()
    const classBody = this.startNode()
    let hadConstructor = false
    classBody.body = []
    // Lazy implementation -- discard types
    this.parseMaybeTSTypeParameterInstantiation()
    this.expect(tt.braceL)
    while (this.type !== tt.braceR) {
      const element = this.parseClassElement(node.superClass !== null)
      if (element) {
        classBody.body.push(element)
        if (element.type === "MethodDefinition" && element.kind === "constructor") {
          if (hadConstructor) this.raise(element.start, "Duplicate constructor in the same class")
          hadConstructor = true
        } else if (element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element)) {
          this.raiseRecoverable(element.key.start, `Identifier '#${element.key.name}' has already been declared`)
        }
      }
    }
    this.strict = oldStrict
    this.next()
    node.body = this.finishNode(classBody, "ClassBody")
    this.exitClassBody()
    return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression")
  }

  parseTSTypeAnnotation(eatColon = true) {
    eatColon && this.expect(tt.colon)
    const node = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc)
    this._parseTSTypeAnnotation(node)
    return this.finishNode(node, 'TSTypeAnnotation')
  }

  _parseTSType() {
    const node = this._parseNonConditionalType()
    if (this.type === tt._extends && !this._hasPrecedingLineBreak()) {
      return this.parseTSConditionalType(node)
    }
    return node
  }

  _parseTSTypeAnnotation(node) {
    node.typeAnnotation = this._parseTSType()
  }

  _parsePrimaryType() {
    let node
    switch (this.type) {
      case tt.name:
        node = this.value in tsPredefinedType
          ? this.parseTSPredefinedType()
          : this.parseTSTypeReference()
        break
      case tt.braceL:
        node = this.parseTSTypeLiteral()
        break
      case tt._void:
      case tt._null:
        node = this.parseTSPredefinedType()
        break
      case tt.parenL:
        node = this.parseTSParenthesizedType()
        break
      case tt.bracketL:
        node = this.parseTSTupleType()
        break
      case tt.num:
      case tt.string:
      case tt._true:
      case tt._false:
        node = this.parseTSLiteralType(this.type)
        break
      case tt._import:
        node = this.parseTSImportType(false)
        break
      default:
        return
    }

    if (this.type === tt.bracketL) {
      node = this._parseMaybeTSArrayType(node)
    }

    return node
  }

  _parseNonConditionalType() {
    let node
    switch (this.type) {
      case tt.name:
        switch (tsTypeOperator[this.value]) {
          case tsTypeOperator.infer:
            node = this.parseTSInferType()
            break
          default:
            node = this._parseTSUnionTypeOrIntersectionType()
        }
        break
      case tt._new:
        node = this.parseTSConstructorType()
        break
      case tt.parenL:
        const recover = this.tsPreparePreview()
        const isStartOfTSFunctionType = this._isStartOfTSFunctionType()
        recover()
        node = isStartOfTSFunctionType
          ? this.parseTSFunctionType()
          : this.parseTSParenthesizedType()
        break
      case tt.relational:
        node = this._isStartOfTypeParameters()
          ? this.parseTSFunctionType()
          : this.unexpected()
        break
      default:
        node = this._parseTSUnionTypeOrIntersectionType()
        break
    }
    return node || this.unexpected()
  }

  _parseTSDeclaration(node, expr) {
    const val = tsDeclaration[expr.name]
    switch (val) {
      case tsDeclaration.interface:
        if (this.type === tt.name) {
          return this.parseTSInterfaceDeclaration()
        }
        break
      case tsDeclaration.type:
        if (this.type === tt.name) {
          return this.parseTSTypeAliasDeclaration()
        }
        break
      default:
        break
    }
    return super.parseExpressionStatement(node, expr)
  }

  parseTSTypeReference() {
    const node = this.startNode()
    let typeName = this.parseIdent()
    if (this.type === tt.dot) {
      typeName = this.parseTSQualifiedName(typeName)
    }
    node.typeName = typeName
    if (this._isStartOfTypeParameters()) {
      node.typeParameters = this.parseTSTypeParameterInstantiation()
    }
    this.finishNode(node, 'TSTypeReference')
    return node
  }

  parseTSPredefinedType() {
    const node = this.startNode()
    const keyword = this.value
    this.next()
    this.finishNode(node, tsPredefinedType[keyword])
    return node
  }

  parseTSLiteralType(tokType) {
    const node = this.startNode()
    const literal = this.parseLiteral(this.value)
    if (tokType === tt._true || tokType === tt._false) {
      literal.value = tokType === tt._true
    }
    node.literal = literal
    return this.finishNode(node, 'TSLiteralType')
  }

  parseTSTupleType() {
    const node = this.startNode()
    const elementTypes = []
    this.eat(tt.bracketL)
    let first = true
    while (!this.eat(tt.bracketR)) {
      first ? (first = false) : this.expect(tt.comma)
      switch (this.type) {
        case tt.name:
          const elem = this.parseTSTypeReference()
          if (this.type === tt.question) {
            elementTypes.push(this.parseTSOptionalType(elem))
          } else {
            elementTypes.push(elem)
          }
          break
        case tt.ellipsis:
          elementTypes.push(this.parseTSRestType())
          break
        case tt.bracketR:
          break
        default:
          this.unexpected()
      }
    }
    node.elementTypes = elementTypes
    return this.finishNode(node, 'TSTupleType')
  }

  parseTSOptionalType(typeRef) {
    const node = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc)
    this.expect(tt.question)
    node.typeAnnotation = typeRef
    return this.finishNode(node, 'TSOptionalType')
  }

  parseTSRestType() {
    const node = this.startNode()
    this.expect(tt.ellipsis)
    this._parseTSTypeAnnotation(node)
    return this.finishNode(node, 'TSRestType')
  }

  _parseMaybeTSArrayType(prev) {
    const node = this.startNodeAtNode(prev)
    this.expect(tt.bracketL)
    if (this.eat(tt.bracketR)) {
      return this.parseTSArrayType(node, prev)
    }
    return this.parseTSIndexedAccessType(node, prev)
  }

  parseTSArrayType(node, elementType) {
    node.elementType = elementType
    return this.finishNode(node, 'TSArrayType')
  }

  parseTSIndexedAccessType(node, objectType) {
    node.objectType = objectType
    node.indexType = this._parseTSType()
    this.expect(tt.bracketR)
    return this.finishNode(node, 'TSIndexedAccessType')
  }

  _isStartOfTSFunctionType() {
    this.nextToken()
    switch (this.type) {
      case tt.parenR:
      case tt.ellipsis:
        return true
      case tt.name:
      case tt._this:
        this.nextToken()
        switch (this.type) {
          case tt.colon:
          case tt.comma:
          case tt.question:
            return true
          case tt.parenR:
            this.nextToken()
            return this.type === tt.arrow
          default:
            return false
        }
      case tt.braceL:
      case tt.bracketL:
        this.type === tt.braceL
          ? this.parseObj(/* isPattern */ true)
          : this.parseBindingAtom()
        switch (this.type) {
          case tt.colon:
          case tt.comma:
          case tt.question:
            return true
          case tt.parenR:
            this.nextToken()
            return this.type === tt.arrow
          default:
            return false
        }
      default:
        return false
    }
  }

  parseTSFunctionType() {
    const node = this.startNode()
    const temp = Object.create(null)
    node.typeParameters = this.parseMaybeTSTypeParameterDeclaration()
    this.parseFunctionParams(temp)
    node.parameters = temp.params
    this.expect(tt.arrow)
    node.typeAnnotation = this.parseTSTypeAnnotation(false)
    return this.finishNode(node, 'TSFunctionType')
  }

  parseTSParenthesizedType() {
    const node = this.startNode()
    this.expect(tt.parenL)
    this._parseTSTypeAnnotation(node)
    this.expect(tt.parenR)
    return this.finishNode(node, 'TSParenthesizedType')
  }

  parseTSUnionType(first) {
    const node = first
      ? this.startNodeAtNode(first)
      : this.startNode()
    const types = []
    first && types.push(first)
    while (this.eat(tt.bitwiseOR)) {
      types.push(this._parseTSIntersectionTypeOrPrimaryType())
    }
    if (types.length === 1) {
      return first
    }
    node.types = types
    return this.finishNode(node, 'TSUnionType')
  }

  parseTSIntersectionType(first) {
    const node = first
      ? this.startNodeAtNode(first)
      : this.startNode()
    const types = []
    first && types.push(first)
    while (this.eat(tt.bitwiseAND)) {
      types.push(this._parsePrimaryType())
    }
    if (types.length === 1) {
      return first
    }
    node.types = types
    return this.finishNode(node, 'TSIntersectionType')
  }

  _parseTSIntersectionTypeOrPrimaryType() {
    this.eat(tt.bitwiseAND)
    const node = this._parsePrimaryType()
    if (this.type === tt.bitwiseAND) {
      return this.parseTSIntersectionType(node)
    }
    return node
  }

  _parseTSUnionTypeOrIntersectionType() {
    this.eat(tt.bitwiseOR)
    const node = this._parseTSIntersectionTypeOrPrimaryType()
    if (this.type === tt.bitwiseOR) {
      return this.parseTSUnionType(node)
    }
    return node
  }

  parseTSConditionalType(checkType) {
    const node = this.startNodeAtNode(checkType)
    node.checkType = checkType
    this.expect(tt._extends)
    node.extendsType = this._parseNonConditionalType()
    this.expect(tt.question)
    node.trueType = this._parseNonConditionalType()
    this.expect(tt.colon)
    node.falseType = this._parseNonConditionalType()
    return this.finishNode(node, 'TSConditionalType')
  }

  parseTSInferType() {
    const node = this.startNode()
    this.next()
    node.typeParameter = this.parseTSTypeParameter()
    return this.finishNode(node, 'TSInferType')
  }

  parseTSImportType(isTypeOf) {
    const node = this.startNode()
    node.isTypeOf = isTypeOf
    this.expect(tt._import)
    this.expect(tt.parenL)
    node.parameter = this.parseTSLiteralType(this.type)
    this.expect(tt.parenR)
    if (this.eat(tt.dot)) {
      let qualifier = this.parseIdent()
      if (this.type === tt.dot) {
        qualifier = this.parseTSQualifiedName(qualifier)
      }
      node.qualifier = qualifier
    }
    return this.finishNode(node, 'TSImportType')
  }

  parseTSQualifiedName(left) {
    let node = this.startNodeAtNode(left)
    node.left = left
    this.expect(tt.dot)
    node.right = this.parseIdent()
    node = this.finishNode(node, 'TSQualifiedName')
    if (this.type === tt.dot) {
      node = this.parseTSQualifiedName(node)
    }
    return node
  }

  parseTSConstructorType() {
    const node = this.startNode()
    this.expect(tt._new)
    node.typeParameters = this.parseMaybeTSTypeParameterDeclaration()
    this.expect(tt.parenL)
    node.parameters = this.parseBindingList(
      tt.parenR,
      false,
      this.options.ecmaVersion >= 8
    )
    this.expect(tt.arrow)
    node.typeAnnotation = this.parseTSTypeAnnotation(false)
    return this.finishNode(node, 'TSConstructorType')
  }

  parseTSConstructSignatureDeclaration() {
    const node = this.startNode()
    this.expect(tt._new)
    node.typeParameters = this.parseMaybeTSTypeParameterDeclaration()
    this.expect(tt.parenL)
    node.parameters = this.parseBindingList(
      tt.parenR,
      false,
      this.options.ecmaVersion >= 8
    )
    if (this.eat(tt.colon)) {
      node.typeAnnotation = this.parseTSTypeAnnotation(false)
    }
    return this.finishNode(node, 'TSConstructSignatureDeclaration')
  }

  parseTSTypeLiteral() {
    return this._parseObjectLikeType('TSTypeLiteral', 'members')
  }

  parseTSTypeAliasDeclaration() {
    const node = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc)
    node.id = this.parseIdent()
    node.typeParameters = this.parseMaybeTSTypeParameterDeclaration()
    this.expect(tt.eq)
    this._parseTSTypeAnnotation(node)
    this.semicolon()
    return this.finishNode(node, 'TSTypeAliasDeclaration')
  }

  parseTSInterfaceDeclaration() {
    const node = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc)
    node.id = this.parseIdent()
    node.typeParameters = this.parseMaybeTSTypeParameterDeclaration()
    if (this.eat(tt._extends)) {
      const heritage = []
      do {
        heritage.push(this.parseTSExpressionWithTypeArguments())
      } while (this.eat(tt.comma))
      node.heritage = heritage
    }
    node.body = this._parseObjectLikeType('TSInterfaceBody', 'body')
    this.semicolon()
    return this.finishNode(node, 'TSInterfaceDeclaration')
  }

  parseTSExpressionWithTypeArguments() {
    const node = this.startNode()
    let expr = this.parseIdent()
    if (this.eat(tt.dot)) {
      expr = this.parseTSQualifiedName(expr)
    }
    node.expr = expr
    if (this._isStartOfTypeParameters()) {
      const typeParameters = this.parseTSTypeParameterInstantiation()
      node.typeParameters = typeParameters
      node.end = typeParameters.end
      if (this.options.locations) {
        node.loc.end = typeParameters.loc.end
      }
    }
    return this.finishNode(node, 'TSExpressionWithTypeArguments')
  }

  parseTSTypeParameter() {
    const node = this.startNode()
    if (this.type === tt.name) {
      node.name = this.value
      this.next()
    } else {
      this.unexpected()
    }
    if (this.eat(tt._extends)) {
      node.constraint = this._parseTSType()
    }
    if (this.eat(tt.eq)) {
      node.default = this._parseTSType()
    }
    return this.finishNode(node, 'TSTypeParameter')
  }

  parseMaybeTSTypeParameterDeclaration() {
    if (this._isStartOfTypeParameters()) {
      const node = this.startNode()
      const params = []
      let first = true
      this.next()
      while (!this.eat(tt.relational)) {
        first ? (first = false) : this.expect(tt.comma)
        if (this._isEndOfTypeParameters()) {
          break
        }
        params.push(this.parseTSTypeParameter())
      }
      node.params = params
      return this.finishNode(node, 'TSTypeParameterDeclaration')
    }
  }

  parseTSTypeParameterInstantiation() {
    const node = this.startNode()
    const params = []
    this.next()
    let first = true
    while (!this.eat(tt.relational)) {
      first ? (first = false) : this.expect(tt.comma)
      if (this._isEndOfTypeParameters()) {
        break
      }
      params.push(this._parseTSType())
    }
    node.params = params
    return this.finishNode(node, 'TSTypeParameterInstantiation')
  }

  parseMaybeTSTypeParameterInstantiation() {
    if (this._isStartOfTypeParameters()) {
      return this.parseTSTypeParameterInstantiation()
    }
  }

  _parseObjectLikeType(kind, prop) {
    const node = this.startNode()
    this.expect(tt.braceL)
    const list = []
    while (!this.eat(tt.braceR)) {
      switch (this.type) {
        case tt.name:
          const key = this.parseIdent()
          switch (this.type) {
            case tt.parenL:
            case tt.relational:
              list.push(this.parseTSMethodSignature(key))
              break
            case tt.colon:
            case tt.semi:
            case tt.comma:
            case tt.braceR:
            case tt.question:
              list.push(this.parseTSPropertySignature(key))
              break
            default:
              if (this._hasPrecedingLineBreak()) {
                list.push(this.parseTSPropertySignature(key))
                continue
              }
              this.unexpected()
          }
          break
        case tt.bracketL:
          const recover = this.tsPreparePreview()
          this.nextToken()
          if (this.type === tt.name) {
            this.nextToken()
            switch (this.type) {
              case tt.colon:
                recover()
                list.push(this.parseTSIndexSignature())
                break
              case tt._in:
                if (list.length === 0) {
                  recover()
                  return this.parseTSMappedType()
                } else {
                  recover()
                  list.push(this.parseTSPropertySignature(null, true))
                }
                break
              default:
                recover()
                list.push(this.parseTSPropertySignature(null, true))
            }
          } else {
            recover()
            list.push(this.parseTSPropertySignature(null, true))
          }
          break
        case tt._new:
          list.push(this.parseTSConstructSignatureDeclaration())
          break
        default:
          this.unexpected()
      }
    }
    node[prop] = list
    return this.finishNode(node, kind)
  }

  parseTSMethodSignature(key) {
    const node = this.startNodeAtNode(key)
    node.key = key
    if (this.eat(tt.question)) {
      node.optional = true
    }
    node.typeParameters = this.parseMaybeTSTypeParameterDeclaration()
    this.expect(tt.parenL)
    node.parameters = this.parseBindingList(
      tt.parenR,
      false,
      this.options.ecmaVersion >= 8
    )
    if (this.type === tt.colon) {
      node.typeAnnotation = this.parseTSTypeAnnotation(true)
    }
    this.eat(tt.comma) || this.eat(tt.semi)
    return this.finishNode(node, 'TSMethodSignature')
  }

  parseTSPropertySignature(key, computed = false) {
    let node
    if (computed) {
      node = this.startNode()
      this.expect(tt.bracketL)
      node.key = this.parseExpression()
      this.expect(tt.bracketR)
    } else {
      node = this.startNodeAtNode(key)
      node.key = key
    }
    node.computed = computed
    if (this.eat(tt.question)) {
      node.optional = true
    }
    if (this.type === tt.colon) {
      node.typeAnnotation = this.parseTSTypeAnnotation(true)
    }
    this.eat(tt.comma) || this.eat(tt.semi)
    return this.finishNode(node, 'TSPropertySignature')
  }

  parseTSIndexSignature() {
    const node = this.startNode()
    this.expect(tt.bracketL)
    const index = this.parseIdent()
    index.typeAnnotation = this.parseTSTypeAnnotation(true)
    index.end = index.typeAnnotation.end
    if (this.options.locations) {
      index.loc.end = index.typeAnnotation.loc.end
    }
    node.index = index
    this.expect(tt.bracketR)
    node.typeAnnotation = this.parseTSTypeAnnotation(true)
    this.eat(tt.comma) || this.eat(tt.semi)
    return this.finishNode(node, 'TSIndexSignature')
  }

  parseTSMappedType() {
    const node = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc)
    this.expect(tt.bracketL)
    node.typeParameter = this._parseTSTypeParameterInTSMappedType()
    this.expect(tt.bracketR)
    if (this.eat(tt.question)) {
      node.optional = true
    }
    if (this.type === tt.colon) {
      node.typeAnnotation = this.parseTSTypeAnnotation(true)
    }
    this.semicolon()
    this.expect(tt.braceR)
    return this.finishNode(node, 'TSMappedType')
  }

  _parseTSTypeParameterInTSMappedType() {
    const node = this.startNode()
    if (this.type === tt.name) {
      node.name = this.value
      this.next()
    } else {
      this.unexpected()
    }
    this.expect(tt._in)
    node.constraint = this._parseNonConditionalType()
    return this.finishNode(node, 'TSTypeParameter')
  }

  _parseMaybeTSExpression(node) {
    if (
      this.type === tt.prefix && tsExprMarkup[this.value] === tsExprMarkup['!']
    ) {
      node = this.parseTSNonNullExpression(node)
    }
    if (
      this.type === tt.name && tsExprMarkup[this.value] === tsExprMarkup.as
    ) {
      node = this.parseTSAsExpression(node)
    }
    return node
  }

  parseTSAsExpression(expression) {
    let node = expression
    while (
      this.type === tt.name && tsExprMarkup[this.value] === tsExprMarkup.as
    ) {
      const _node = this.startNodeAtNode(node)
      this.next()
      _node.expression = node
      this._parseTSTypeAnnotation(_node)
      node = this.finishNode(_node, 'TSAsExpression')
    }
    return expression
  }

  parseTSNonNullExpression(expression) {
    let node = expression
    while (
      this.type === tt.prefix && tsExprMarkup[this.value] === tsExprMarkup['!']
    ) {
      const _node = this.startNodeAtNode(node)
      _node.expression = node
      this.next()
      node = this.finishNode(_node, 'TSNonNullExpression')
    }
    return node
  }
}
