'use strict'

const webpack = require('webpack')
const paths = require('../utils/paths')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { useHotReload } = require('./webpack.vars')

const buildCozyBarCss = `${paths.appBuild}/cozy-bar.css`

let plugins = [
  new webpack.DefinePlugin({
    __DEVELOPMENT__: true,
    __STACK_ASSETS__: false
  }),
  new webpack.ProvidePlugin({
    'cozy.client': 'cozy-client-js/dist/cozy-client.js',
    'cozy.bar': 'cozy-bar/dist/cozy-bar.js'
  }),
  new CopyPlugin([
    {
      from: paths.appCozyBarCss,
      to: buildCozyBarCss
    }
  ]),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: ['cozy-bar.css'],
    append: false,
    publicPath: true
  })
]

if (useHotReload) {
  plugins = plugins.concat([new webpack.HotModuleReplacementPlugin()])
}

module.exports = {
  devtool: '#source-map',
  mode: 'development',
  externals: ['cozy'],
  plugins
}
