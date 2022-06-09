'use strict'

const fs = require('fs-extra')
const paths = require('../utils/paths')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

const { environment, isDebugMode, getReactExposer } = require('./webpack.vars')
const manifest = fs.readJsonSync(paths.appManifest())

const production = environment === 'production'
const appName = manifest.name_prefix
  ? `${manifest.name_prefix} ${manifest.name}`
  : manifest.name

module.exports = {
  entry: {
    // since the file extension depends on the framework here
    // we get it from a function call
    app: [
      require.resolve('@babel/polyfill'),
      // Exposed variables in global scope (needed for cozy-bar)
      getReactExposer(),
      paths.appMobileIndex()
    ]
  },
  output: {
    path: paths.appMobileWWW(),
    pathinfo: isDebugMode
  },
  plugins: [
    new webpack.DefinePlugin({
      __ALLOW_HTTP__: !production,
      __TARGET__: JSON.stringify('mobile'),
      __APP_VERSION__: JSON.stringify(manifest.version)
    }),
    new webpack.ProvidePlugin({
      'cozy.client': production
        ? 'cozy-client-js/dist/cozy-client.min.js'
        : 'cozy-client-js/dist/cozy-client.js',
      'cozy.bar': production
        ? 'cozy-bar/dist/cozy-bar.mobile.min.js'
        : 'cozy-bar/dist/cozy-bar.mobile.js'
    }),
    new HtmlWebpackPlugin({
      template: paths.appMobileHtmlTemplate(),
      title: appName,
      chunks: ['vendors', 'app'],
      inject: false,
      minify: {
        collapseWhitespace: true
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    })
  ]
}
