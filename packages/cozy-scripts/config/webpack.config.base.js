'use strict'

const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PostCSSAssetsPlugin = require('postcss-assets-webpack-plugin')
const paths = require('../utils/paths')

const {extractor, production, isDebugMode} = require('./webpack.vars')

module.exports = {
  output: {
    filename: '[name].js'
  },
  resolve: {
    modules: [paths.appNodeModules, paths.appSrc],
    extensions: ['.js', '.json', '.css'],
    // linked package will still be see as a node_modules package
    symlinks: false
  },
  bail: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|cozy-(bar|client-js))/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: 'node_modules/.cache/babel-loader/js',
          presets: [
            ['cozy-app', { react: false }]
          ]
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
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
                ident: 'postcss',
                sourceMap: true,
                plugins: function () {
                  return [ require('autoprefixer')({ browsers: ['last 2 versions'] }) ]
                }
              }
            }
          ]
        })
      }
    ],
    noParse: [
      /localforage\/dist/
    ]
  },
  plugins: [
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    extractor,
    new PostCSSAssetsPlugin({
      test: /\.css$/,
      log: isDebugMode,
      plugins: [
        require('css-mqpacker'),
        require('postcss-discard-duplicates'),
        require('postcss-discard-empty')
      ].concat(
        production ? require('csswring')({preservehacks: true, removeallcomments: true}) : []
      )
    })
  ]
}
