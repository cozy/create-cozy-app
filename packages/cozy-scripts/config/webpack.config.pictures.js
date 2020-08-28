'use strict'
const { environment, target } = require('./webpack.vars')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

const isMobile = target === 'mobile'

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        include: /(\/|\\)(sprites|icons)(\/|\\)/,
        loader: require.resolve('svg-sprite-loader'),
        options: {
          symbolId: '[name]_[hash]'
        }
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        exclude: /(\/|\\)(sprites|icons|public)(\/|\\)/,
        loader: require.resolve('file-loader'),
        options: {
          // mobile app needs relative path since it uses file://
          outputPath: isMobile ? './img' : 'img/',
          publicPath: isMobile ? './img' : '/img',
          name: `[name]${environment === 'production' ? '.[hash]' : ''}.[ext]`
        }
      },
      /*
        For public pages, we need to have all used assets into the build/public
        folder in order to be served by cozy-stack in the public pages
      */
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        include: /public/,
        loader: require.resolve('file-loader'),
        options: {
          // mobile app needs relative path since it uses file://
          outputPath: isMobile ? './public/img' : 'public/img',
          publicPath: isMobile ? './public/img' : '/public/img',
          name: `[name]${environment === 'production' ? '.[hash]' : ''}.[ext]`
        }
      }
    ]
  },
  plugins: [
    // In the extract mode, the loader must be configured with the plugin
    new SpriteLoaderPlugin()
  ]
}
