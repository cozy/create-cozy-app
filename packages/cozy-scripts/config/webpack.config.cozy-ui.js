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
          fallback: require.resolve('style-loader'),
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                sourceMap: true,
                plugins: function () {
                  return [ require('autoprefixer')({ browsers: ['last 2 versions'] }) ]
                }
              }
            },
            require.resolve('stylus-loader')
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
