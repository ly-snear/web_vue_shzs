module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  'globals': {
    'Ajax': true,
    'HeyUI': true,
    'Utils': true,
    'Manba': true,
    'Vue': true,
    'R': true,
    'G': true,
    'log': true,
    'Model': true,
    'BMap': true,
    'error': true
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'template-curly-spacing': 'off',
    'vue/multi-word-component-names': 'off',
    'no-irregular-whitespace': 'off',
    camelcase: 'off',
    indent: 'off',
    'no-undef': 'off',
    'semi': [
      'error',
      'always'
    ],
    'eqeqeq': 'off',
    'linebreak-style': [
      'error',
      'unix'
    ],
    'no-useless-call': 'off',
    'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }],
    'no-unused-vars': [
      'error',
      // we are only using this rule to check for unused arguments since TS
      // catches unused variables but not args.
      { varsIgnorePattern: '.*', args: 'none' }
    ]
  }
  // parserOptions: {
  //   parser: 'babel-eslint'
  // }
};
