'use strict'

const webpack = require('webpack')
const paths = require('../utils/paths')

module.exports = {
  devtool: '#source-map',
  externals: ['cozy'],
  module: {
    rules: [{
      test: require.resolve(paths.appCozyBarJs),
      loader: 'imports-loader',
      options: {
        css: paths.appCozyBarCss
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      __STACK_ASSETS__: false
    }),
    new webpack.ProvidePlugin({
      'cozy.client': 'cozy-client-js/dist/cozy-client.js',
      'cozy.bar': 'cozy-bar/dist/cozy-bar.js'
    })
  ]
}
