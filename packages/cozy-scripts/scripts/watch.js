'use strict'

const webpack = require('webpack')
const getWebpackConfigs = require('./config')
const colorize = require('../utils/_colorize')

// add a way to provide success callback for (at least) better tests
// return a watcher to be able to close it programmatically
module.exports = (buildOptions, successCallback) => {
  const options = Object.assign({}, buildOptions, {
    mode: buildOptions.mode || 'development',
    target: buildOptions.target || 'browser'
  })

  const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'

  // webpack configurations
  const configs = getWebpackConfigs(options)
  for (const config in configs) {
    configs[config].bail = false // disable bail when watching
  }
  const compiler = webpack(configs)

  let watcher
  watcher = compiler.watch({}, (err, stats) => {
    if (err) {
      console.error(new Error(colorize.red(err)))
      return
    }

    if (stats) {
      console.log(stats.toString({
        // display modules in debug mode
        modules: isDebugMode,
        // display chunks in debug mode
        chunks: isDebugMode,
        // Shows colors in the console
        colors: true
      }))
    }

    if (typeof successCallback === 'function') successCallback(watcher)
  })
}
