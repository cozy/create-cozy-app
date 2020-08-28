'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const { useHotReload, devtool } = require('./webpack.vars')

let plugins = [
  new webpack.DefinePlugin({
    __DEVELOPMENT__: true
  })
]

// In development, the bar and cozy-client-js are provided automatically. We use the ProvidePlugin
// since it allows us to use in production the cozy.bar and cozy.client declared by the <script />
// line injected by the stack, while in developement to have it "served" from
// our node_modules
const stackProvidedLibsConfig = {
  plugins: [
    new webpack.DefinePlugin({
      __STACK_ASSETS__: false
    }),
    new webpack.ProvidePlugin({
      'cozy.bar': 'cozy-bar/dist/cozy-bar.min.js',
      'cozy.client': 'cozy-client-js/dist/cozy-client.min.js'
    })
  ],
  module: {
    rules: [
      {
        test: /cozy-bar(\/|\\)dist(\/|\\)cozy-bar\.min\.js$/,
        // Automatically import the CSS if the JS is imported.
        // imports-loader@0.8.0 works but imports-loader@1.0.0 does not
        loader: 'imports-loader?css=./cozy-bar.min.css'
      }
    ]
  }
}

let output = {}
if (useHotReload) {
  plugins = plugins.concat([new webpack.HotModuleReplacementPlugin()])
  output.globalObject = 'this'
}

module.exports = merge(
  {
    devtool: devtool || 'cheap-module-eval-source-map',
    mode: 'development',
    externals: ['cozy'],
    plugins,
    output,
    optimization: {
      removeAvailableModules: false,
      removeEmptyChunks: false
    }
  },
  stackProvidedLibsConfig
)
