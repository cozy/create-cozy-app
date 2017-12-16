'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')

// default NODE_ENV to browser development
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'browser:development'

const target = process.env.NODE_ENV.match(/^(\w+):/)[1]
const environment = process.env.NODE_ENV.match(/^\w+:(\w+)$/)[1]
const production = environment === 'production'

const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'

module.exports = {
  environment,
  target,
  isDebugMode,
  extractor: new ExtractTextPlugin(`[name]${production ? '.[hash].min' : ''}.css`)
}
