'use strict'

const webpack = require('webpack')
const getWebpackConfigs = require('./config')
const colorize = require('../utils/_colorize')

// default NODE_ENV to browser production (build script)
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'browser:production'

const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'

// add a way to provide success callback for (at least) better tests
module.exports = (successCallback) => {
  // webpack configurations
  const configs = getWebpackConfigs()
  for (const config in configs) {
    configs[config].bail = true // enable bail when building
  }
  const compiler = webpack(configs)

  compiler.run((err, stats) => {
    if (err) {
      throw new Error(colorize.red(err))
    }

    console.log(stats.toString({
      modules: isDebugMode, // display modules in debug mode
      chunks: isDebugMode, // display chunks in debug mode
      colors: true // Shows colors in the console
    }))

    if (typeof successCallback === 'function') successCallback()
  })
}
