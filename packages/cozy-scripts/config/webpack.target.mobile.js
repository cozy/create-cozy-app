'use strict'

const paths = require('../utils/paths')
const webpack = require('webpack')

const {production} = require('./webpack.vars')

module.exports = {
  resolve: {
    modules: [paths.appNodeModules, paths.appSrc, paths.appMobileSrc]
  },
  entry: [paths.appMobileMain],
  output: {
    path: paths.appMobileWWW
  },
  plugins: [
    new webpack.DefinePlugin({
      __ALLOW_HTTP__: !production,
      __TARGET__: JSON.stringify('mobile')
    }),
    new webpack.ProvidePlugin({
      'cozy.client': 'cozy-client-js/dist/cozy-client.js',
      'cozy.bar': 'cozy-bar/dist/cozy-bar.mobile.js'
    })
  ]
}
