'use strict'

const webpack = require('webpack')
const paths = require('../utils/paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require(paths.appPackageJson)

module.exports = {
  entry: {
    // since the file extension depends on the framework here
    // we get it from a function call
    app: paths.appBrowserIndex()
  },
  output: {
    path: paths.appBuild,
    filename: '[name].js'
  },
  externals: {
    'cozy-client-js': 'cozy'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appBrowserHtmlTemplate,
      title: pkg.name,
      inject: false,
      chunks: ['app'],
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('browser')
    })
  ]
}
