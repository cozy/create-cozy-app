'use strict'

const fs = require('fs-extra')
const webpack = require('webpack')
const paths = require('../utils/paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const { isDebugMode } = require('./webpack.vars')
const manifest = fs.readJsonSync(paths.appManifest)

const appName = manifest.name_prefix
  ? `${manifest.name_prefix} ${manifest.name}`
  : manifest.name

module.exports = {
  entry: {
    // since the file extension depends on the framework here
    // we get it from a function call
    app: [require.resolve('babel-polyfill'), paths.appBrowserIndex()]
  },
  output: {
    path: paths.appBuild,
    filename: '[name].js',
    pathinfo: isDebugMode
  },
  externals: {
    'cozy-client-js': 'cozy'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appBrowserHtmlTemplate,
      title: appName,
      inject: false,
      excludeChunks: ['intents'],
      minify: {
        collapseWhitespace: true
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('browser')
    })
  ]
}
