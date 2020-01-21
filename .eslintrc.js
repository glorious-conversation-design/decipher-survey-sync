module.exports =
 {
  env:
   {
    node: true,
    browser: true,
    es6: true,
   },
  extends: 'eslint:recommended',
  globals:
   {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    jQuery: 'readonly',
    '$': 'readonly',
    '_': 'readonly',
   },
  // parser: 'babel-eslint',
  parserOptions:
   {
    ecmaVersion: 2018,
    sourceType: 'module',
   },
  rules:
   {
    // Generic.
    // 'strict':                       ['warn',  'global'],
    'block-spacing':                ['error'],
    'quotes':                       ['error', 'single'],
    'space-infix-ops':              ['error'],
    'space-in-parens':              ['error', 'never'],
    'array-bracket-spacing':        ['error', 'never'],
    'computed-property-spacing':    ['error', 'never'],
    'template-curly-spacing':       ['error', 'never'],
    'quote-props':                  ['error', 'as-needed'],
    'object-shorthand':             ['error', 'never'],
    'key-spacing':                  ['error', { beforeColon: false, afterColon: true }],
    'switch-colon-spacing':         ['error', { before: false, after: true }],
    'comma-style':                  ['error', 'last'],
    'comma-spacing':                ['error', { before: false, after: true }],
    'comma-dangle':                 ['error', 'always-multiline'],
    'keyword-spacing':              ['error', { before: true, after: true }],
    'space-unary-ops':              ['error', { words: true, nonwords: false }],
    'space-before-blocks':          ['error', 'always'],
    'semi':                         ['error', 'always'],
    'semi-spacing':                 ['error', { before: false, after: true }],
    'semi-style':                   ['error', 'last'],
    'no-trailing-spaces':           ['error'],
    'linebreak-style':              ['error', 'unix'],
    'eol-last':                     ['error', 'always'],

    'no-console':                   ['off'],

    // Function.
    'func-style':                   ['error', 'declaration', { 'allowArrowFunctions': true }],
    'func-call-spacing':            ['error', 'never'],
    'space-before-function-paren':  ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
    'arrow-spacing':                ['error', { before: true, after: true }],
    'generator-star-spacing':       ['error', { before: true, after: false }],

    // Class.
    'lines-between-class-members':  ['error', 'always'],
    'no-class-assign':              ['error'],
    'no-useless-constructor':       ['error'],
    'no-useless-rename':            ['error'],

    // New.
    'new-parens':                   ['error'],
    'no-array-constructor':         ['error'],
    'no-new-object':                ['error'],
    'no-new-wrappers':              ['error'],
    'no-new-symbol':                ['error'],

    // Language.
    'no-lonely-if':                 ['error'],
    'no-mixed-operators':           ['error'],
    'no-multi-assign':              ['error'],
    'no-unneeded-ternary':          ['error'],
    'no-var':                       ['error'], // Use `let` or `const`.
    'prefer-const':                 ['error'],
    'operator-assignment':          ['error', 'always'],
    'no-fallthrough':               ['off', { commentPattern: 'break' }], // Doesn't work. Needs to be 'off'.
    'max-statements-per-line':      ['error', { max: 1 }],

    // Comments.
    'spaced-comment':               ['error', 'always'],
    // 'capitalized-comments':         ['error'],

    // Unsure.
    'no-underscore-dangle':         ['warn'],  // Use the new private # sign.
    // 'one-var':                      ['warn',  'never'],
    'nonblock-statement-body-position': ['error', 'beside'],
    // padding-line-between-statements
    // prefer-rest-params

    'no-tabs':                      ['error'],
    'no-mixed-spaces-and-tabs':     ['error'],
    // 'indent':                       ['error', 4, { SwitchCase: 1, VariableDeclarator: 'first', MemberExpression: 0, FunctionDeclaration: { parameters: 'first' }, CallExpression: { arguments: 'first' }, ArrayExpression: 1, ObjectExpression: 1, }],
    // 'brace-style':                  ['error', 'allman'],

    'require-atomic-updates':       ['off'],
   },
 };
