'use strict'

const webpack = require('webpack')
const configs = require('./config')

// the main app config is at the first position
const appConfig = configs[0]
appConfig.bail = false // disable bail when watching
const compiler = webpack(appConfig)

const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'

// add a way to provide success callback for (at least) better tests
// return a watcher to be able to close it programmatically
module.exports = (successCallback) => {
  let watcher
  watcher = compiler.watch({}, (err, stats) => {
    if (err) {
      // FIXME For some weird reasons, hex is not available from chalk in the jest
      // tests environment, so we have to explicitly use colors ansi characters
      throw new Error(`\u001b[38;2;221;5;5m${err}\u001b[39m`)
    }

    console.log(stats.toString({
      modules: isDebugMode, // display modules in debug mode
      chunks: isDebugMode,  // display chunks in debug mode
      colors: true    // Shows colors in the console
    }))

    if (typeof successCallback === 'function') successCallback(watcher)
  })
}
