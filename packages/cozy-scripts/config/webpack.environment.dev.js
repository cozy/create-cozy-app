'use strict'

const webpack = require('webpack')
const paths = require('../utils/paths')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {
  assetsFolderName,
  hasPublic,
  useHotReload,
  useClientJS,
  publicFolderName
} = require('./webpack.vars')

const devAssetFolder = hasPublic
  ? `${publicFolderName}/${assetsFolderName}`
  : assetsFolderName

const buildPublicCozyBarCss = `${paths.appBuild()}/${devAssetFolder}/cozy-bar.css`
const buildPublicCozyBarJs = `${paths.appBuild()}/${devAssetFolder}/cozy-bar.js`
const buildPublicCozyClientJs = `${paths.appBuild()}/${devAssetFolder}/cozy-client-js.js`

const htmlAssets = [
  `${devAssetFolder}/cozy-bar.js`,
  `${devAssetFolder}/cozy-bar.css`
]

const toCopy = [
  {
    from: paths.appCozyBarJs(),
    to: buildPublicCozyBarJs
  },
  {
    from: paths.appCozyBarCss(),
    to: buildPublicCozyBarCss
  }
]

if (useClientJS) {
  toCopy.push({
    from: paths.appCozyClientJs(),
    to: buildPublicCozyClientJs
  })
  htmlAssets.push(`${devAssetFolder}/cozy-client-js.js`)
}

let plugins = [
  new webpack.DefinePlugin({
    __DEVELOPMENT__: true,
    __STACK_ASSETS__: false
  }),
  // We need to put all assets in the public build folder since
  // public pages will need to have them public
  new CopyPlugin(toCopy),
  new HtmlWebpackIncludeAssetsPlugin({
    assets: htmlAssets,
    append: false,
    publicPath: true
  })
]

let output = {}
if (useHotReload) {
  plugins = plugins.concat([new webpack.HotModuleReplacementPlugin()])
  output.globalObject = 'this'
}

module.exports = {
  devtool: '#source-map',
  mode: 'development',
  externals: ['cozy'],
  plugins,
  output
}
