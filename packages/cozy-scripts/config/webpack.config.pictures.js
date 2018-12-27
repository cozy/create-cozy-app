'use strict'
const { environment } = require('./webpack.vars')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        include: /(sprites|icons)/,
        loader: require.resolve('svg-sprite-loader'),
        options: {
          symbolId: '[name]_[hash]'
        }
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        exclude: /(sprites|icons|public)/,
        loader: require.resolve('file-loader'),
        options: {
          outputPath: './img',
          publicPath: './img',
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
          outputPath: './public/img',
          publicPath: './public/img',
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
