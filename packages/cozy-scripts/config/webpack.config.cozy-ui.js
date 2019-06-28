'use strict'

const paths = require('../utils/paths')
const cozyUIPlugin = require(paths.appCozyUiStylus())
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const { getCSSLoader } = require('./webpack.vars')

module.exports = {
  resolve: {
    extensions: ['.styl']
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        exclude: /(node_modules|cozy-ui\/react)/,
        use: [
          getCSSLoader(),
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
              plugins: function() {
                return [
                  require('autoprefixer')({
                    overrideBrowserslist: ['extends browserslist-config-cozy']
                  })
                ]
              }
            }
          },
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
