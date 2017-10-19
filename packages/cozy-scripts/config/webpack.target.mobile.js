'use strict'

const paths = require('../utils/paths')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {production} = require('./webpack.vars')
const pkg = require(paths.appPackageJson)

module.exports = {
  entry: [paths.appMobileIndexJsx],
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
      'cozy.client': 'cozy-client-js/dist/cozy-client.js',
      'cozy.bar': 'cozy-bar/dist/cozy-bar.mobile.js'
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
