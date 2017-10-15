'use strict'

const webpack = require('webpack')
const paths = require('../utils/paths')

module.exports = {
  entry: {
    app: paths.appIndexJsx
  },
  output: {
    path: paths.appBuild,
    filename: '[name].js'
  },
  externals: {
    'cozy-client-js': 'cozy'
  },
  plugins: [
    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('browser')
    })
  ]
}
