'use strict'

module.exports = {
  optimization: {
    splitChunks: {
      // split all node_modules inside a separated chunk
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
