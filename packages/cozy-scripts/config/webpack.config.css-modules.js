'use strict'

const { getCSSLoader } = require('./webpack.vars')
const postCSSLoaderConfig = require('./postcss-loader-config')

module.exports = {
  __mergeStrategy: {
    smart: true,
    strategy: {
      // loaders !== rules
      'module.loaders': 'replace'
    }
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
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]--[hash:base64:5]'
            }
          },
          postCSSLoaderConfig,
          {
            loader: require.resolve('stylus-loader'),
            options: {
              preferPathResolver: 'webpack'
            }
          }
        ]
      }
    ]
  }
}
