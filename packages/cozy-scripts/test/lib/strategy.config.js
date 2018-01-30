const { extractor } = require('cozy-scripts/config/webpack.vars')

const configs = [
  {
    resolve: {
      extensions: ['.styl']
    },
    module: {
      rules: [
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
        },
        {
          test: /\.styl$/,
          exclude: /(node_modules|cozy-ui\/react)/,
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
                  sourceMap: true,
                  plugins: function () {
                    return [ require('autoprefixer')({ browsers: ['last 2 versions'] }) ]
                  }
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    }
  },
  {
    __mergeStrategy: {
      smart: true,
      strategy: {
        'module.loaders': 'replace'
      }
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          exclude: /(node_modules|cozy-ui\/react)/,
          loader: extractor.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[local]--[hash:base64:5]'
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: function () {
                    return [ require('autoprefixer')({ browsers: ['last 2 versions'] }) ]
                  }
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    }
  }
]

module.exports = configs
