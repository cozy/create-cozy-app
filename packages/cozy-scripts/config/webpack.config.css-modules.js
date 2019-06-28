'use strict'

const { getCSSLoader } = require('./webpack.vars')

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
        exclude: /(node_modules|cozy-ui\/react)/,
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
              preferPathResolver: 'webpack'
            }
          }
        ]
      }
    ]
  }
}
