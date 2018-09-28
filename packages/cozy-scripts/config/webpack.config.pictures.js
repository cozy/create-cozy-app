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
        exclude: /(sprites|icons)/,
        loader: require.resolve('file-loader'),
        options: {
          outputPath: 'img/',
          publicPath: '/img', // for webpack dev server
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
