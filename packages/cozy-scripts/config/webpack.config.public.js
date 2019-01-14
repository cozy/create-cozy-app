'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs-extra')
const paths = require('../utils/paths')
const manifest = fs.readJsonSync(paths.appManifest())
const { publicFolderName, target } = require('./webpack.vars')

const appName = manifest.name_prefix
  ? `${manifest.name_prefix} ${manifest.name}`
  : manifest.name

/* We don't build public if no public and if on mobile build */
const addPublicConfig =
  target === 'browser' &&
  fs.existsSync(paths.appPublicIndex()) &&
  fs.existsSync(paths.appPublicHtmlTemplate())

function getConfig() {
  return addPublicConfig
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
