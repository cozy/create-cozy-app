'use strict'

const { eslintFix } = require('./webpack.vars')

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
          emitWarning: true
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
          emitWarning: true
        }
      }
    ]
  }
}
