'use strict'

const webpack = require('webpack')
const appConfig = require('./config.js')
const colorize = require('../utils/_colorize.js')

const compiler = webpack(Object.assign({}, appConfig))

const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'

// add a way to provide success callback for (at least) better tests
// return a watcher to be able to close it programmatically
module.exports = (successCallback) => {
  let watcher
  watcher = compiler.watch({}, (err, stats) => {
    if (err) {
      throw new Error(colorize.red(err))
    }

    console.log(stats.toString({
      modules: isDebugMode, // display modules
      chunks: isDebugMode,  // display chunks
      colors: true    // Shows colors in the console
    }))

    if (typeof successCallback === 'function') successCallback(watcher)
  })
}
