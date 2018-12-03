'use strict'

const webpack = require('webpack')
const getWebpackConfigs = require('./config')
const cleanBuild = require('../utils/cleanBuild')
const CTS = require('../utils/constants.js')

// add a way to provide success callback for (at least) better tests
module.exports = (buildOptions, successCallback) => {
  const buildTarget = buildOptions.target || 'browser'
  const options = Object.assign({}, buildOptions, {
    mode: buildOptions.mode || 'production',
    target: buildTarget
  })

  // remove build folder
  cleanBuild(buildTarget)

  const isDebugMode = process.env[CTS.DEBUG] === 'true'

  // webpack configurations
  const configs = getWebpackConfigs(options)
  for (const config in configs) {
    configs[config].bail = true // enable bail when building
  }
  const compiler = webpack(configs)

  compiler.run((err, stats) => {
    const isTestMode = typeof successCallback === 'function'

    if (err) {
      console.error(err.stack || err)
      if (err.details) console.error(err.details)
      throw new Error('The webpack build failed.')
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
      throw new Error('Webpack build errored.')
    }

    if (isTestMode) successCallback()
  })
}
