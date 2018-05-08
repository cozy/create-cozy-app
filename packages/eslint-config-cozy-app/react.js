'use strict'

const basics = require('./basics')

module.exports = {
  plugins: basics.plugins,
  extends: [
    ...basics.extends,
    'plugin:react/recommended'
  ],
  parser: basics.parser,
  parserOptions: { ecmaFeatures: { jsx: true } },
  env: basics.env,
  rules: {
    ...basics.rules,
    'react/prop-types': 0
  }
}
