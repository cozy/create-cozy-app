'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const colorize = require('../utils/_colorize')

// default NODE_ENV to browser development
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'browser:development'

const target = process.env.NODE_ENV.match(/^(\w+):/)[1]
const environment = process.env.NODE_ENV.match(/^\w+:(\w+)$/)[1]
const production = environment === 'production'

console.log(colorize.cyan(`Compiling for ${colorize.orange.bold(environment)} environment and ${colorize.orange.bold(target)} target...`))

const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'
const addAnalyzer = process.env.COZY_SCRIPTS_ANALYZER === 'true'
const useHotReload = process.env.HOT_RELOAD === 'true'

module.exports = {
  environment,
  target,
  isDebugMode,
  addAnalyzer,
  useHotReload,
  extractor: new ExtractTextPlugin({
    disable: useHotReload,
    filename: `[name]${production ? '.[hash].min' : ''}.css`
  })
}
