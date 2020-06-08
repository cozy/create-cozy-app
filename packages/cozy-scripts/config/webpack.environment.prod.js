'use strict'

const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')

const { target } = require('./webpack.vars')

module.exports = {
  mode: 'production',
  plugins: [
    // use a hash as chunk id to avoid id changes of not changing chunk
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // to compile on production mode (redux)
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __STACK_ASSETS__: target !== 'mobile'
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        //To fix a SAfari 10 bug : https://github.com/zeit/next.js/issues/5630
        terserOptions: {
          safari10: true
        }
      })
    ]
  }
}
