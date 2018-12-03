'use strict'

const webpack = require('webpack')
const { environment } = require('./webpack.vars')
const CTS = require('../utils/constants.js')

process.env[CTS.ENTRY_EXT] = '.jsx'
process.env[CTS.USE_PREACT] = true

const development = environment === 'development'
const entry = development ? ['preact/devtools'] : []

const plugins = development
  ? [
      new webpack.ProvidePlugin({
        'window.React': 'preact-compat'
      })
    ]
  : []

module.exports = {
  entry,
  resolve: {
    extensions: ['.jsx'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',

      // https://github.com/developit/preact-compat/issues/392
      'preact-compat': 'preact-compat/dist/preact-compat'
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules\/(?!(cozy-ui))/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: 'node_modules/.cache/babel-loader/react',
          presets: ['cozy-app']
        }
      }
    ]
  },
  plugins
}
