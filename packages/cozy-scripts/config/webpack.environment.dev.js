'use strict'

const webpack = require('webpack')
const paths = require('../utils/paths')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { useHotReload, publicFolderName } = require('./webpack.vars')

const buildPublicCozyBarCss = `${paths.appBuild()}/${publicFolderName}/cozy-bar.css`
const buildPublicCozyBarJs = `${paths.appBuild()}/${publicFolderName}/cozy-bar.js`
const buildPublicCozyClientJs = `${paths.appBuild()}/${publicFolderName}/cozy-client-js.js`

let plugins = [
  new webpack.DefinePlugin({
    __DEVELOPMENT__: true,
    __STACK_ASSETS__: false
  }),
  // We need to put all assets in the public build folder since
  // public pages will need to have them public
  new CopyPlugin([
    {
      from: paths.appCozyBarJs(),
      to: buildPublicCozyBarJs
    },
    {
      from: paths.appCozyBarCss(),
      to: buildPublicCozyBarCss
    },
    {
      from: paths.appCozyClientJs(),
      to: buildPublicCozyClientJs
    }
  ]),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: [
      `${publicFolderName}/cozy-bar.js`,
      `${publicFolderName}/cozy-bar.css`,
      `${publicFolderName}/cozy-client-js.js`
    ],
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
