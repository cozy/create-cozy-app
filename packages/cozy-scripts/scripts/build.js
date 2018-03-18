'use strict'

const webpack = require('webpack')
const getWebpackConfigs = require('./config')
const colorize = require('../utils/_colorize')

// add a way to provide success callback for (at least) better tests
module.exports = (buildOptions, successCallback) => {
  const options = Object.assign({}, buildOptions, {
    mode: buildOptions.mode || 'production',
    target: buildOptions.target || 'browser'
  })

  const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'

  // webpack configurations
  const configs = getWebpackConfigs(options)
  for (const config in configs) {
    configs[config].bail = true // enable bail when building
  }
  const compiler = webpack(configs)

  compiler.run((err, stats) => {
    if (err) {
      throw new Error(colorize.red(err))
    }

    console.log(stats.toString({
      // display modules in debug mode
      modules: isDebugMode,
      // display chunks in debug mode
      chunks: isDebugMode,
      // Shows colors in the console
      colors: true
    }))

    if (typeof successCallback === 'function') successCallback()
  })
}
