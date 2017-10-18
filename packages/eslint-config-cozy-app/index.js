'use strict'

// standardJS
module.exports = {
  extends: ['standard', 'standard-jsx'],
  parser: 'babel-eslint',
  parserOptions: { ecmaFeatures: { jsx: true } },
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true
  }
}
