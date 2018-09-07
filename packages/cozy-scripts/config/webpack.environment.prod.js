'use strict'

const webpack = require('webpack')
const {target} = require('./webpack.vars')

module.exports = {
  mode: 'production',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __STACK_ASSETS__: target !== 'mobile'
    })
  ]
}
