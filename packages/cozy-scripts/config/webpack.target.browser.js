'use strict'

const fs = require('fs-extra')
const webpack = require('webpack')
const paths = require('../utils/paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const { getFilename, isDebugMode, getReactExposer } = require('./webpack.vars')
const manifest = fs.readJsonSync(paths.appManifest())

const appName = manifest.name_prefix
  ? `${manifest.name_prefix} ${manifest.name}`
  : manifest.name

module.exports = {
  entry: {
    app: [
      // polyfills, avoid to import it in the application
      require.resolve('@babel/polyfill'),
      // Exposed variables in global scope (needed for cozy-bar)
      getReactExposer(),
      // since the file extension depends on the framework here
      // we get it from a function call
      paths.appBrowserIndex()
    ]
  },
  output: {
    path: paths.appBuild(),
    filename: `${getFilename()}.js`,
    pathinfo: isDebugMode
  },
  externals: {
    'cozy-client-js': 'cozy'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appBrowserHtmlTemplate(),
      title: appName,
      inject: false,
      chunks: ['vendors', 'app'],
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
