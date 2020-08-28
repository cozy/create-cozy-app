'use strict'

const { getCSSLoader } = require('./webpack.vars')
const paths = require('../utils/paths')
const cozyUIPlugin = require(paths.appCozyUiStylus())
const postCSSLoaderConfig = require('./postcss-loader-config')

module.exports = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        include: /(cozy-ui(\/|\\)react)/,
        use: [
          getCSSLoader(),
          {
            loader: require.resolve('css-loader'),
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]--[hash:base64:5]'
            }
          },
          postCSSLoaderConfig,
          {
            loader: require.resolve('stylus-loader'),
            options: {
              use: [cozyUIPlugin()]
            }
          }
        ]
      }
    ]
  }
}
