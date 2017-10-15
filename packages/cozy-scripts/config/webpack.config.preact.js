'use strict'

module.exports = {
  resolve: {
    extensions: ['.jsx'],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat'
    }
  },
  module: {
    rules: [{
      test: /\.jsx$/,
      exclude: /node_modules\/(?!(cozy-ui))/,
      loader: 'babel-loader'
    }]
  }
}
