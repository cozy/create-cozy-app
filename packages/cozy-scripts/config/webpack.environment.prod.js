'use strict'

const webpack = require('webpack')
const {target} = require('./webpack.vars')

module.exports = {
  mode: 'production',
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // to compile on production mode (redux)
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __SSL__: true,
      __STACK_ASSETS__: target !== 'mobile'
    })
  ]
}
