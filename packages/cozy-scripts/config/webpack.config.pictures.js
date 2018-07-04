'use strict'

const { environment } = require('./webpack.vars')

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        include: /(sprites|icons)/,
        loader: require.resolve('svg-sprite-loader'),
        options: {
          name: '[name]_[hash]'
        }
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        exclude: /(sprites|icons)/,
        loader: require.resolve('file-loader'),
        options: {
          outputPath: 'img/',
          publicPath: '/', // for standalone mode
          name: `[name]${environment === 'production' ? '.[hash]' : ''}.[ext]`
        }
      }
    ]
  }
}
