'use strict'

const webpack = require('webpack')
const configs = require('./config')
const colorize = require('../utils/_colorize')

for (const config in configs) {
  configs[config].bail = false // disable bail when watching
}
const compiler = webpack(configs)

const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'

// add a way to provide success callback for (at least) better tests
// return a watcher to be able to close it programmatically
module.exports = (successCallback) => {
  let watcher
  watcher = compiler.watch({}, (err, stats) => {
    if (err) {
      console.error(new Error(colorize.red(err)))
    }

    console.log(stats.toString({
      modules: isDebugMode, // display modules in debug mode
      chunks: isDebugMode,  // display chunks in debug mode
      colors: true    // Shows colors in the console
    }))

    if (typeof successCallback === 'function') successCallback(watcher)
  })
}
