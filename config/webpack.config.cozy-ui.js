'use strict'

const paths = require('../utils/paths')
const cozyUIPlugin = require(paths.appCozyUiStylus())
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const { getCSSLoader } = require('./webpack.vars')
const postCSSLoaderConfig = require('./postcss-loader-config')

module.exports = {
  resolve: {
    extensions: ['.styl']
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        exclude: /(node_modules|cozy-ui(\/|\\)react)/,
        use: [
          getCSSLoader(),
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          postCSSLoaderConfig,
          {
            loader: require.resolve('stylus-loader'),
            options: {
              preferPathResolver: 'webpack',
              use: [cozyUIPlugin()]
            }
          }
        ]
      }
    ]
  },
  plugins: [new SpriteLoaderPlugin()]
}
