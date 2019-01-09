'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs-extra')
const paths = require('../utils/paths')
const manifest = fs.readJsonSync(paths.appManifest())
const { publicFolderName } = require('./webpack.vars')

const appName = manifest.name_prefix
  ? `${manifest.name_prefix} ${manifest.name}`
  : manifest.name

function getConfig() {
  return fs.existsSync(paths.appPublicIndex()) &&
    fs.existsSync(paths.appPublicHtmlTemplate())
    ? {
        entry: {
          // since the file extension depends on the framework here
          // we get it from a function call
          [publicFolderName]: [
            require.resolve('babel-polyfill'),
            paths.appPublicIndex()
          ]
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: paths.appPublicHtmlTemplate(),
            title: appName,
            filename: `${publicFolderName}/index.html`,
            inject: false,
            chunks: [publicFolderName],
            minify: {
              collapseWhitespace: true
            }
          })
        ]
      }
    : {}
}

module.exports = getConfig()
