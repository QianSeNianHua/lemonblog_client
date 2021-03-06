module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-trailing-spaces': 'off',
    'no-unused-vars': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': ['error', {
        'singleline': 3,
        'multiline': {
            'max': 3,
            'allowFirstLine': false
        }
    }],
    'vue/html-self-closing': 'off',
    'vue/require-default-prop': 'off',
    'vue/html-closing-bracket-newline': ['error', {
      'singleline': 'never',
      'multiline': 'never'
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
