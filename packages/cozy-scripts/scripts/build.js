'use strict'

const webpack = require('webpack')
const configs = require('./config')
const colorize = require('../utils/_colorize')

for (const config in configs) {
  configs[config].bail = true // enable bail when building
}
const compiler = webpack(configs)

const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'

// add a way to provide success callback for (at least) better tests
module.exports = (successCallback) => {
  compiler.run((err, stats) => {
    if (err) {
      throw new Error(colorize.red(err))
    }

    console.log(stats.toString({
      modules: isDebugMode, // display modules in debug mode
      chunks: isDebugMode,  // display chunks in debug mode
      colors: true    // Shows colors in the console
    }))

    if (typeof successCallback === 'function') successCallback()
  })
}
