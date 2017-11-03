'use strict'

/* This file is used FOR TESTS PURPOSE ONLY */

const myConfig = {
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  }
}

module.exports = [ myConfig ]
