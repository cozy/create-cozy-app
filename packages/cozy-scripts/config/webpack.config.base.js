'use strict'

const PostCSSAssetsPlugin = require('postcss-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const paths = require('../utils/paths')

const { environment, isDebugMode, getCSSLoader } = require('./webpack.vars')
const production = environment === 'production'

module.exports = {
  output: {
    filename: '[name].[contenthash].js'
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
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: 'node_modules/.cache/babel-loader/js',
          presets: [['cozy-app', { react: false }]]
        }
      },
      {
        test: /\.css$/,
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
              ident: 'postcss',
              sourceMap: true,
              plugins: function() {
                return [
                  require('autoprefixer')({ browsers: ['last 2 versions'] })
                ]
              }
            }
          }
        ]
      }
    ],
    noParse: [/localforage\/dist/]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `[name]${production ? '.[contenthash].min' : ''}.css`,
      chunkFilename: `[name].[id]${production ? '.[contenthash].min' : ''}.css`
    }),
    new PostCSSAssetsPlugin({
      test: /\.css$/,
      log: isDebugMode,
      plugins: [
        require('css-mqpacker'),
        require('postcss-discard-duplicates'),
        require('postcss-discard-empty')
      ].concat(
        production
          ? require('csswring')({
              preservehacks: true,
              removeallcomments: true
            })
          : []
      )
    })
  ]
}
