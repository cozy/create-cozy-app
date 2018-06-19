'use strict'

const paths = require('../utils/paths')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {production} = require('./webpack.vars')
const pkg = require(paths.appPackageJson)

module.exports = {
  entry: {
    // since the file extension depends on the framework here
    // we get it from a function call
    app: [require.resolve('babel-polyfill'), paths.appMobileIndex()]
  },
  output: {
    path: paths.appMobileWWW
  },
  plugins: [
    new webpack.DefinePlugin({
      __ALLOW_HTTP__: !production,
      __TARGET__: JSON.stringify('mobile'),
      __APP_VERSION__: JSON.stringify(pkg.version)
    }),
    new webpack.ProvidePlugin({
      'cozy.client': production ? 'cozy-client-js/dist/cozy-client.min.js' : 'cozy-client-js/dist/cozy-client.js',
      'cozy.bar': production ? 'cozy-bar/dist/cozy-bar.mobile.min.js' : 'cozy-bar/dist/cozy-bar.mobile.js'
    }),
    new HtmlWebpackPlugin({
      template: paths.appMobileHtmlTemplate,
      title: pkg.name,
      chunks: ['app'],
      inject: 'head',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}
