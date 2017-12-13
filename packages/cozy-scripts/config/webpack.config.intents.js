'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('../utils/paths')
const pkg = require(paths.appPackageJson)

module.exports = {
  entry: {
    // since the file extension depends on the framework here
    // we get it from a function call
    intents: paths.appIntentsIndex()
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appIntentsHtmlTemplate,
      title: `${pkg.name} intents`,
      filename: 'intents/index.html',
      inject: false,
      chunks: ['intents'],
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}
