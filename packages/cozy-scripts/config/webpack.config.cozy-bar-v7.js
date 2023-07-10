'use strict'

const webpack = require('webpack')
const paths = require('../utils/paths')
const {
  publicFolderName,
  intentsFolderName,
  getReactExposer,
  shouldAddPublicConfig,
  environment,
  target
} = require('./webpack.vars')

const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const buildPublicCozyBarCss = `${paths.appBuild()}/${publicFolderName}/cozy-bar.css`
const buildPublicCozyBarJs = `${paths.appBuild()}/${publicFolderName}/cozy-bar.js`

let cozyBarModule = {
  // Exposed variables in global scope (needed for cozy-bar)
  entry: {
    app: [getReactExposer()],
    [intentsFolderName]: [getReactExposer()]
  },
  plugins: []
}

// We need to put all assets in the public build folder since
// public pages will need to have them public
if (shouldAddPublicConfig()) {
  cozyBarModule = {
    ...cozyBarModule,
    entry: {
      ...cozyBarModule.entry,
      [publicFolderName]: [getReactExposer()]
    },
    plugins: [
      new CopyPlugin([
        {
          from: paths.appCozyBarJs(),
          to: buildPublicCozyBarJs
        },
        {
          from: paths.appCozyBarCss(),
          to: buildPublicCozyBarCss
        }
      ]),
      new HtmlWebpackIncludeAssetsPlugin({
        assets: [
          `${publicFolderName}/cozy-bar.js`,
          `${publicFolderName}/cozy-bar.css`
        ],
        append: false,
        publicPath: true
      })
    ]
  }
}

if (target === 'mobile') {
  cozyBarModule.plugins.push(
    new webpack.ProvidePlugin({
      'cozy.bar':
        environment === 'production'
          ? 'cozy-bar/dist/cozy-bar.mobile.min.js'
          : 'cozy-bar/dist/cozy-bar.mobile.js'
    })
  )
}

if (environment !== 'production') {
  cozyBarModule.plugins.push(
    new webpack.ProvidePlugin({
      'cozy.bar': 'cozy-bar/dist/cozy-bar.js'
    })
  )

  cozyBarModule.module = {
    rules: [
      {
        test: /cozy-bar(\/|\\)dist(\/|\\)cozy-bar\.js$/,
        // Automatically import the CSS if the JS is imported.
        // imports-loader@0.8.0 works but imports-loader@1.0.0 does not
        loader: 'imports-loader?css=./cozy-bar.css'
      }
    ]
  }
}

module.exports = cozyBarModule
