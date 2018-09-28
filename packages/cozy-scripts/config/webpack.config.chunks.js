'use strict'

module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      // split all node_modules inside a separated chunk
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
