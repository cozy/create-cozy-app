'use strict'

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
          presets: ['cozy-app']
        }
      }
    ]
  }
}
