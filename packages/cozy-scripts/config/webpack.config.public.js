'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs-extra')
const paths = require('../utils/paths')
const CTS = require('../utils/constants')
const manifest = fs.readJsonSync(paths.appManifest())
const { publicFolderName, target } = require('./webpack.vars')

const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const appName = manifest.name_prefix
  ? `${manifest.name_prefix} ${manifest.name}`
  : manifest.name

/* We don't build public if no public and if on mobile build */
const shouldAddPublicConfig = () =>
  process.env[CTS.FORCE_PUBLIC] == 'true' ||
  (target === 'browser' &&
    fs.existsSync(paths.appPublicIndex()) &&
    fs.existsSync(paths.appPublicHtmlTemplate()))

const buildPublicCozyClientJs = `${paths.appBuild()}/${publicFolderName}/cozy-client-js.js`

function getConfig() {
  return shouldAddPublicConfig()
    ? {
        entry: {
          // since the file extension depends on the framework here
          // we get it from a function call
          [publicFolderName]: [
            require.resolve('@babel/polyfill'),
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
          }),

          // We need to put all assets in the public build folder since
          // public pages will need to have them public
          new CopyPlugin({
            patterns: [
              {
                from: paths.appCozyClientJs(),
                to: buildPublicCozyClientJs
              }
            ]
          }),
          new HtmlWebpackIncludeAssetsPlugin({
            assets: [`${publicFolderName}/cozy-client-js.js`],
            append: false,
            publicPath: true
          })
        ]
      }
    : {}
}

module.exports = getConfig()
