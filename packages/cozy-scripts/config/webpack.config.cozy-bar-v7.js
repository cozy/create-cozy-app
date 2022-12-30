'use strict'

const webpack = require('webpack')
const paths = require('../utils/paths')
const {
  publicFolderName,
  intentsFolderName,
  getReactExposer,
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
    [publicFolderName]: [getReactExposer()],
    [intentsFolderName]: [getReactExposer()]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: paths.appCozyBarJs(),
          to: buildPublicCozyBarJs
        },
        {
          from: paths.appCozyBarCss(),
          to: buildPublicCozyBarCss
        }
      ]
    }),
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
