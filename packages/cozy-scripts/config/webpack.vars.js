'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')

// default NODE_ENV to browser development
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'browser:development'

const target = process.env.NODE_ENV.match(/^(\w+):/)[1]
const environment = process.env.NODE_ENV.match(/^\w+:(\w+)$/)[1]
const production = environment === 'production'

module.exports = {
  environment,
  target,
  extractor: new ExtractTextPlugin(`[name]${production ? '.[hash].min' : ''}.css`)
}
