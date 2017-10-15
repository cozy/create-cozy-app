'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const target = process.env.NODE_ENV.match(/^(\w+):/)[1]
const environment = process.env.NODE_ENV.match(/^\w+:(\w+)$/)[1]
const production = environment === 'production'

module.exports = {
  environment,
  target,
  extractor: new ExtractTextPlugin(`[name]${production ? '.[hash].min' : ''}.css`)
}
