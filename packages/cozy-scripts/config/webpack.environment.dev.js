'use strict'

const webpack = require('webpack')
const paths = require('../utils/paths')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { useHotReload } = require('./webpack.vars')

const buildCozyBarCss = `${paths.appBuild}/cozy-bar.css`
const buildCozyBarJs = `${paths.appBuild}/cozy-bar.js`
const buildCozyClientJs = `${paths.appBuild}/cozy-client-js.js`

let plugins = [
  new webpack.DefinePlugin({
    __DEVELOPMENT__: true,
    __STACK_ASSETS__: false
  }),
  new CopyPlugin([
    {
      from: paths.appCozyBarJs,
      to: buildCozyBarJs
    },
    {
      from: paths.appCozyBarCss,
      to: buildCozyBarCss
    },
    {
      from: paths.appCozyClientJs,
      to: buildCozyClientJs
    }
  ]),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: ['cozy-bar.js', 'cozy-bar.css', 'cozy-client-js.js'],
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
