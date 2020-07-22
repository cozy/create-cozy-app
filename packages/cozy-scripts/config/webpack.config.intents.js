'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs-extra')
const paths = require('../utils/paths')
const manifest = fs.readJsonSync(paths.appManifest())
const { target, getReactExposer } = require('./webpack.vars')

const intentsFolderName = 'intents'

const appName = manifest.name_prefix
  ? `${manifest.name_prefix} ${manifest.name}`
  : manifest.name

/* We don't build intents if no intents and if on mobile build */
const addIntentsConfig =
  target === 'browser' &&
  fs.existsSync(paths.appIntentsIndex()) &&
  fs.existsSync(paths.appIntentsHtmlTemplate())

function getConfig() {
  return addIntentsConfig
    ? {
        entry: {
          // since the file extension depends on the framework here
          // we get it from a function call
          [intentsFolderName]: [
            require.resolve('@babel/polyfill'),
            // Exposed variables in global scope (needed for cozy-bar)
            getReactExposer(),
            paths.appIntentsIndex()
          ]
        },
        plugins: [
          new HtmlWebpackPlugin({
            template: paths.appIntentsHtmlTemplate(),
            title: `${appName} intents`,
            filename: `${intentsFolderName}/index.html`,
            inject: false,
            chunks: ['vendors', 'intents'],
            minify: {
              collapseWhitespace: true
            }
          })
        ]
      }
    : {}
}

module.exports = getConfig()
