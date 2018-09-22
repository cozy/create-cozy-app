'use strict'

const { environment, useHotReload } = require('./webpack.vars')

const forceWarning = environment === 'production' || useHotReload

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
          emitWarning: forceWarning
        }
      },
      {
        enforce: 'pre',
        test: /\.vue$/,
        loader: require.resolve('eslint-loader'),
        exclude: /node_modules/,
        options: {
          extends: ['cozy-app/vue'],
          emitWarning: forceWarning
        }
      },
      {
        enforce: 'pre',
        test: /\.jsx$/,
        loader: require.resolve('eslint-loader'),
        exclude: /node_modules/,
        options: {
          extends: ['cozy-app/react'],
          emitWarning: forceWarning
        }
      }
    ]
  }
}
