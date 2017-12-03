'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('../utils/paths')
const pkg = require(paths.appPackageJson)

module.exports = {
  entry: {
    // since the file extension depends on the framework here
    // we get it from a function call
    services: paths.appServicesIndex()
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: paths.appServicesHtmlTemplate,
      title: `${pkg.name} services`,
      filename: 'services/index.html',
      inject: false,
      chunks: ['services'],
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}
