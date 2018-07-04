'use strict'

const {isDebugMode} = require('./webpack.vars')

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: require.resolve('eslint-loader'),
        exclude: /node_modules/,
        options: {
          extends: ['cozy-app'],
          emitWarning: isDebugMode
        }
      },
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: require.resolve('eslint-loader'),
        exclude: /node_modules/,
        options: {
          extends: ['cozy-app/vue'],
          emitWarning: isDebugMode
        }
      },
      {
        enforce: 'pre',
        test: /\.jsx$/,
        loader: require.resolve('eslint-loader'),
        exclude: /node_modules/,
        options: {
          extends: ['cozy-app/react'],
          emitWarning: isDebugMode
        }
      }
    ]
  }
}
