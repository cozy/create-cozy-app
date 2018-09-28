'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs-extra')
const paths = require('../utils/paths')
const manifest = fs.readJsonSync(paths.appManifest)

const appName = manifest.name_prefix
  ? `${manifest.name_prefix} ${manifest.name}`
  : manifest.name

function getConfig() {
  return fs.existsSync(paths.appIntentsIndex()) &&
    fs.existsSync(paths.appIntentsHtmlTemplate)
    ? {
        entry: {
          // since the file extension depends on the framework here
          // we get it from a function call
          intents: [require.resolve('babel-polyfill'), paths.appIntentsIndex()]
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: paths.appIntentsHtmlTemplate,
            title: `${appName} intents`,
            filename: 'intents/index.html',
            inject: false,
            excludeChunks: ['app'],
            minify: {
              collapseWhitespace: true
            }
          })
        ]
      }
    : {}
}

module.exports = getConfig()
