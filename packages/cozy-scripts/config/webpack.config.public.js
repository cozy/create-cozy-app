'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs-extra')
const paths = require('../utils/paths')
const CTS = require('../utils/constants')
const manifest = fs.readJsonSync(paths.appManifest())
const { publicFolderName, target, getReactExposer } = require('./webpack.vars')

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

const buildPublicCozyBarCss = `${paths.appBuild()}/${publicFolderName}/cozy-bar.css`
const buildPublicCozyBarJs = `${paths.appBuild()}/${publicFolderName}/cozy-bar.js`
const buildPublicCozyClientJs = `${paths.appBuild()}/${publicFolderName}/cozy-client-js.js`

function getConfig() {
  return shouldAddPublicConfig()
    ? {
        entry: {
          // since the file extension depends on the framework here
          // we get it from a function call
          [publicFolderName]: [
            require.resolve('@babel/polyfill'),
            // Exposed variables in global scope (needed for cozy-bar)
            getReactExposer(),
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
          new CopyPlugin([
            {
              from: paths.appCozyBarJs(),
              to: buildPublicCozyBarJs
            },
            {
              from: paths.appCozyBarCss(),
              to: buildPublicCozyBarCss
            },
            {
              from: paths.appCozyClientJs(),
              to: buildPublicCozyClientJs
            }
          ]),
          new HtmlWebpackIncludeAssetsPlugin({
            assets: [
              `${publicFolderName}/cozy-bar.js`,
              `${publicFolderName}/cozy-bar.css`,
              `${publicFolderName}/cozy-client-js.js`
            ],
            append: false,
            publicPath: true
          })
        ]
      }
    : {}
}

module.exports = getConfig()
