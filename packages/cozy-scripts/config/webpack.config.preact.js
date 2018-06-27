'use strict'

process.env.__ENTRY_EXT__ = '.jsx'

const webpack = require('webpack')
const { environment } = require('./webpack.vars')

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
        loader: 'babel-loader',
        options: {
          cacheDirectory: 'node_modules/.cache/babel-loader/react',
          presets: ['cozy-app']
        }
      }
    ]
  },
  plugins
}
