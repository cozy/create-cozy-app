'use strict'

const webpack = require('webpack')
const PostCSSAssetsPlugin = require('postcss-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const paths = require('../utils/paths')
const postCSSLoaderConfig = require('./postcss-loader-config')

const {
  environment,
  isDebugMode,
  getCSSLoader,
  makeCSSChunkFilename,
  makeCSSFilename,
  getEnabledFlags
} = require('./webpack.vars')
const production = environment === 'production'

module.exports = {
  resolve: {
    // It's important that node_modules here is kept relative so that
    // inner node_modules are checked before checking the app node_modules
    modules: [paths.appSrc(), 'node_modules', paths.appNodeModules()],
    extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
    // linked package will still be see as a node_modules package
    symlinks: false,
    alias: {
      src: paths.appSrc(),
      test: paths.appTest()
    }
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
              importLoaders: 1
            }
          },
          postCSSLoaderConfig
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: `[name].[ext]`
        }
      }
    ],
    noParse: [/localforage\/dist/]
  },
  plugins: [
    /*
    Adding the `MiniCssExtractPlugin` plugin to the `webpack.config.public.js` configuration file,
    prevents duplication of CSS files except for the CSS file in the public folder
    which is duplicated in the root of the build.
    It is therefore preferable to handle this case in the `makeCSSFilename` function.
    */
    new MiniCssExtractPlugin({
      filename: ({ chunk: { name } }) => makeCSSFilename(name),
      chunkFilename: makeCSSChunkFilename()
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
    }),
    new webpack.DefinePlugin({
      __ENABLED_FLAGS__: JSON.stringify(getEnabledFlags())
    })
  ]
}
