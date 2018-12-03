'use strict'

const { getCSSLoader, cozyUIMajorVersion } = require('./webpack.vars')
const paths = require('../utils/paths')
const cozyUIPlugin = require(paths.appCozyUiStylus())

const NonTranspiledConfig = {
  module: {
    rules: [
      {
        test: /\.styl$/,
        include: /(cozy-ui\/react)/,
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
          {
            loader: require.resolve('postcss-loader'),
            options: {
              sourceMap: true,
              plugins: function() {
                return [
                  require('autoprefixer')({ browsers: ['last 2 versions'] })
                ]
              }
            }
          },
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

const TranspiledConfig = {
  resolve: {
    alias: {
      'cozy-ui/react': 'cozy-ui/transpiled/react'
    }
  }
}

module.exports =
  cozyUIMajorVersion >= 15 ? TranspiledConfig : NonTranspiledConfig
