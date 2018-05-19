'use strict'

process.env.__ENTRY_EXT__ = '.jsx'

module.exports = {
  resolve: {
    extensions: ['.jsx'],
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',

      // https://github.com/developit/preact-compat/issues/392
      'preact-compat': 'preact-compat/dist/preact-compat'
    }
  },
  module: {
    rules: [{
      test: /\.jsx$/,
      exclude: /node_modules\/(?!(cozy-ui))/,
      loader: 'babel-loader',
      options: {
        cacheDirectory: 'node_modules/.cache/babel-loader/react',
        presets: ['cozy-app']
      }
    }]
  }
}
