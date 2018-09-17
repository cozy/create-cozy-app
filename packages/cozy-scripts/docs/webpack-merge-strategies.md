# Merge configs using strategies with `cozy-scripts`

`cozy-scripts` uses the [`webpack-merge`](https://github.com/survivejs/webpack-merge) module to merge all webpack config files provided by default or by the application. And that module can handle many merge options.

## Smart merging

When this mode is used, `webpack-merge` will try to be smart about loaders merging and will try to gather loaders with matching tests into a single one.
This merge kind also handle strategies explained in the next part. You can find more informations in the [official documentation](https://github.com/survivejs/webpack-merge#smart-merging)

## Strategies

When merging configurations, the mechanism will append by default properties and values. Sometimes you may want to replace a previous property by a new one without duplicating it. So you have to specify a merge strategy for the related configuration. You can find more informations in the [official documentation](https://github.com/survivejs/webpack-merge#merging-with-strategies)

## How to use them?

`cozy-scripts` will check the configurations before merging and passing them to `webpack` and a custom property, named `__mergeStrategy`, will allow you to specify a strategy when merging the related configuration. Then this property will be removed right before using `webpack` since custom properties are not allowed.

Let's take a case where you want to use the `webpack.bundle.default` but you want to replace the stylus loader (from `webpack.config.cozy-ui.js`) which doesn't use `css-modules` by default to use them. Here is the configuration that you must provide:

```javascript
// app.config.js

const configs = require('cozy-scripts/config/webpack.bundle.default.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = [configs,
  {
    // this object should be in a separate JS file for better readibility
    // but this is an example
    __mergeStrategy: {
      smart: true, // enable the smart mode or not (Boolean)
      strategy: {
        // webpack config properties here like `entry`, `output`...

        'module.loaders': 'replace' // replace | append | prepend
        // loaders !== rules, we want to replace loader properties not rules directly
      }
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          // the exclude property must also be the same than the loader
          // you want to replace
          exclude: /(node_modules|cozy-ui\/react)/,
          loader: extractor.extract({
            fallback: 'style-loader',
            use: [
              MiniCssExtractPlugin.loader,
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
```
