'use strict'

const webpack = require('webpack')
const paths = require('../utils/paths')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
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
  }),
  /*
  Here is the trick about hot-reload:
  We launch a webpack-dev-server but we write the computed build files to the disk to allow running `cozy-stack server` on them.
  */
  new WriteFilePlugin({
    exitOnErrors: false,
    // Copy only assets on disk, other files will be from memory (dev-server)
    // .js and .css files are more likely to be changed
    // than assets during development
    test: /(?!(\.js|\.css))$/
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
