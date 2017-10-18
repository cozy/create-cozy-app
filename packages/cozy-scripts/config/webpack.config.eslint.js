'use strict'

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre', // was preLoaders property in webpack v1
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          extends: ['cozy-app']
        }
      }
    ]
  }
}
