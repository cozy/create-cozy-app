'use strict'

const VueLoaderPlugin = require('vue-loader/lib/plugin')

process.env.__ENTRY_EXT__ = '.js'

module.exports = {
  resolve: {
    extensions: ['.vue']
  },
  module: {
    rules: [{
      test: /\.vue$/,
      exclude: /node_modules/,
      loader: 'vue-loader'
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
