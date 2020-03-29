'use strict'

const webpack = require('webpack')
const { useHotReload } = require('./webpack.vars')

let plugins = [
  new webpack.DefinePlugin({
    __DEVELOPMENT__: true,
    __STACK_ASSETS__: false
  })
]

let output = {}
if (useHotReload) {
  plugins = plugins.concat([new webpack.HotModuleReplacementPlugin()])
  output.globalObject = 'this'
}

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  externals: ['cozy'],
  plugins,
  output,
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false
  }
}
