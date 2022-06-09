'use strict'

module.exports = {
  optimization: {
    splitChunks: {
      // split all node_modules inside a separated chunk
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          // exclude public chunk since public script must contains all
          // modules itself
          chunks: chunk => chunk.name !== 'public'
        }
      }
    }
  }
}
