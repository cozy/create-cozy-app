'use strict'

const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs-extra')
const paths = require('../utils/paths')
const manifest = fs.readJsonSync(paths.appManifest())
const {
  publicFolderName,
  useCozyClientJs,
  shouldAddPublicConfig
} = require('./webpack.vars')

const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const appName = manifest.name_prefix
  ? `${manifest.name_prefix} ${manifest.name}`
  : manifest.name

const buildPublicCozyClientJs = `${paths.appBuild()}/${publicFolderName}/cozy-client-js.js`

/* We don't build public if no public and if on mobile build */
function getConfig() {
  if (shouldAddPublicConfig()) {
    const plugins = [
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

    if (useCozyClientJs) {
      /* We need to put all assets in the public build folder since 
         public pages will need to have them public */
      plugins.push(
        new CopyPlugin([
          {
            from: paths.appCozyClientJs(),
            to: buildPublicCozyClientJs
          }
        ]),
        new HtmlWebpackIncludeAssetsPlugin({
          assets: [`${publicFolderName}/cozy-client-js.js`],
          append: false,
          publicPath: true
        })
      )
    }

    return {
      entry: {
        // since the file extension depends on the framework here
        // we get it from a function call
        [publicFolderName]: [
          require.resolve('@babel/polyfill'),
          paths.appPublicIndex()
        ]
      },
      plugins
    }
  }
  return {}
}

module.exports = getConfig()
