'use strict'

const { environment, useHotReload, eslintFix } = require('./webpack.vars')

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
          fix: eslintFix,
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
          fix: eslintFix,
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
          fix: eslintFix,
          emitWarning: forceWarning
        }
      }
    ]
  }
}
