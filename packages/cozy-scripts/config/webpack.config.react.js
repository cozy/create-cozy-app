'use strict'

const webpack = require('webpack')
const { useHotReload } = require('./webpack.vars')

process.env.__ENTRY_EXT__ = '.jsx'

module.exports = {
  resolve: {
    extensions: ['.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules\/(?!(cozy-ui))/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: 'node_modules/.cache/babel-loader/react',
          presets: ['cozy-app'],
          plugins: useHotReload ? ['react-hot-loader/babel'] : []
        }
      }
    ]
  },
  // Necessary for cozy-ui during Preact -> React apps transition
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        USE_REACT: 'true'
      }
    })
  ]
}
