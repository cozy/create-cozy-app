'use strict'

// standardJS
module.exports = {
  extends: ['standard', 'standard-jsx', 'eslint-config-prettier'],
  parser: 'babel-eslint',
  parserOptions: { ecmaFeatures: { jsx: true } },
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true
  }
}

/* Prettier usage
Many points in prettier are in conflics with current standardJS version:
  - single quotes in JSX
  - space before parenthesis in function definition

Since prettier is considered as a much better formatter
(different from a linter), we keep in this eslint config only
standardJS config/plugin. It's why prettier specific errors
won't be displayed using linting here (for rules about code wrapping
for example).

But prettier can be used as a formater only while keeping standardJS
compatibilty by using both commands: */
//   prettier --write '{src,test}/**/*.{js,jsx}' && eslint --fix '{src,test}/**/*.{js,jsx}'
