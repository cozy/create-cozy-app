'use strict'

const { eslintFix } = require('./webpack.vars')
const ESLintPlugin = require('eslint-webpack-plugin')
const cozyApp = require('eslint-config-cozy-app')
const cozyAppReact = require('eslint-config-cozy-app/react')

const options = {
  emitWarning: true,
  baseConfig: cozyApp,
  extensions: ['js', 'ts'],
  fix: eslintFix
}

const reactOptions = {
  ...options,
  baseConfig: cozyAppReact,
  extension: ['jsx', 'tsx']
}

module.exports = {
  plugins: [new ESLintPlugin(options), new ESLintPlugin(reactOptions)]
}
