'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const paths = require('../utils/paths')
const pkg = require(paths.appPackageJson)

module.exports = {
  entry: {
    services: paths.appServicesIndexJsx
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
