'use strict'

// standardJS
module.exports = {
  plugins: ['prettier'],
  extends: [
    'eslint:recommended',
    'eslint-config-prettier',
    'plugin:react/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: { ecmaFeatures: { jsx: true } },
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true
  },
  rules: {
    'prettier/prettier': ['error', {
      singleQuote: true,
      semi: false
    }],
    'react/prop-types': 0
  }
}
