'use strict'

const { useHotReload } = require('./webpack.vars')
const CTS = require('../utils/constants.js')

process.env[CTS.ENTRY_EXT] = '.jsx'

module.exports = {
  resolve: {
    extensions: ['.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules(\/|\\)(?!(cozy-ui))/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: 'node_modules/.cache/babel-loader/react',
          presets: ['cozy-app'],
          plugins: useHotReload ? ['react-hot-loader/babel'] : []
        }
      }
    ]
  }
}
