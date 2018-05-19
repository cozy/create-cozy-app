'use strict'

const basics = require('./basics')

module.exports = {
  plugins: basics.plugins,
  extends: [
    ...basics.extends,
    'plugin:vue/recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: basics.env
}
