'use strict'

const colorize = require('../utils/_colorize')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// default NODE_ENV to browser development
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'browser:development'

const target = process.env.NODE_ENV.match(/^(\w+):/)[1]
const environment = process.env.NODE_ENV.match(/^\w+:(\w+)$/)[1]

console.log(colorize.cyan(`Compiling for ${colorize.orange.bold(environment)} environment and ${colorize.orange.bold(target)} target...`))

const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'
const addAnalyzer = process.env.COZY_SCRIPTS_ANALYZER === 'true'
const useHotReload = process.env.HOT_RELOAD === 'true'
const eslintFix = process.env.COZY_SCRIPTS_ESLINT_FIX === 'true'

const getCSSLoader = function () {
  return useHotReload ? require.resolve('style-loader') : MiniCssExtractPlugin.loader
}

module.exports = {
  addAnalyzer,
  environment,
  eslintFix,
  getCSSLoader,
  isDebugMode,
  target,
  useHotReload
}
