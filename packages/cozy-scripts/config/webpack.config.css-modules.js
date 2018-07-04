'use strict'

const { extractor } = require('./webpack.vars')

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
        loader: extractor.extract({
          fallback: require.resolve('style-loader'),
          use: [
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
  }
}
