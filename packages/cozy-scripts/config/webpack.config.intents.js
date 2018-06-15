'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs-extra')
const paths = require('../utils/paths')
const pkg = require(paths.appPackageJson)

function getConfig () {
  return (fs.existsSync(paths.appIntentsIndex()) &&
    fs.existsSync(paths.appIntentsHtmlTemplate))
    ? {
      entry: {
        // since the file extension depends on the framework here
        // we get it from a function call
        intents: [require.resolve('babel-polyfill'), paths.appIntentsIndex()]
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
    } : {}
}

module.exports = getConfig()
