'use strict'

const webpack = require('webpack')

const { extractor } = require('./webpack.vars')
const paths = require('../utils/paths')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  resolve: {
    extensions: ['.styl']
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        exclude: /(node_modules|cozy-ui\/react)/,
        loader: extractor.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: function () {
                  return [ require('autoprefixer')({ browsers: ['last 2 versions'] }) ]
                }
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new SpriteLoaderPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [ require(paths.appCozyUiStylus)() ]
        }
      }
    })
  ]
}
