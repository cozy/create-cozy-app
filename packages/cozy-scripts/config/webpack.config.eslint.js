'use strict'

const {isDebugMode} = require('./webpack.vars')

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          extends: ['cozy-app'],
          emitWarning: isDebugMode
        }
      },
      {
        enforce: 'pre',
        test: /\.jsx$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          extends: ['cozy-app/react'],
          emitWarning: isDebugMode
        }
      }
    ]
  }
}
