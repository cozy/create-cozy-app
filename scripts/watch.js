'use strict'

const webpack = require('webpack')
const getWebpackConfigs = require('./config')
const cleanBuild = require('../utils/cleanBuild')
const CTS = require('../utils/constants.js')

// add a way to provide success callback for (at least) better tests
// return a watcher to be able to close it programmatically
module.exports = (buildOptions, successCallback) => {
  const buildTarget = buildOptions.target || 'browser'
  const options = Object.assign({}, buildOptions, {
    mode: buildOptions.mode || 'development',
    target: buildTarget
  })

  // remove build folder
  cleanBuild(buildTarget)

  const isDebugMode = process.env[CTS.DEBUG] === 'true'

  // webpack configurations
  const configs = getWebpackConfigs(options)
  for (const config in configs) {
    configs[config].bail = false // disable bail when watching
  }
  const compiler = webpack(configs)

  let watcher
  watcher = compiler.watch({}, (err, stats) => {
    const isTestMode = typeof successCallback === 'function'

    if (err) {
      console.error(err.stack || err)
      if (err.details) console.error(err.details)
      if (isTestMode) {
        throw new Error('Webpack build failed.')
      } else {
        return
      }
    }

    if (stats) {
      console.log(
        stats.toString({
          // display modules in debug mode
          modules: isDebugMode,
          // display chunks in debug mode
          chunks: isDebugMode,
          // Shows colors in the console
          colors: true
        })
      )
    }

    if (stats.hasErrors()) {
      // errros should already displayed by stats just before
      if (isTestMode) throw new Error('Webpack build errored.')
    }

    if (isTestMode) successCallback(watcher)
  })
}
