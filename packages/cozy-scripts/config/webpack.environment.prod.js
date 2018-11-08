'use strict'

const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const { target } = require('./webpack.vars')

module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin()]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // to compile on production mode (redux)
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __STACK_ASSETS__: target !== 'mobile'
    })
  ]
}
