'use strict'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const colorize = require('../utils/_colorize')
const cleanBuild = require('../utils/cleanBuild')
const getWebpackConfigs = require('./config')

const port = process.env.DEV_PORT || '8888'
const host = process.env.DEV_HOST || 'localhost'

// There is no callback available on compiler here,
// it's not handled by webpack-dev-server 2.x
// see https://github.com/webpack/webpack-dev-server/issues/818
module.exports = (buildOptions) => {
  const buildTarget = buildOptions.target || 'browser'
  const options = Object.assign({}, buildOptions, {
    mode: buildOptions.mode || 'development',
    target: buildOptions.target || 'browser'
  })

  // remove build folder
  cleanBuild(buildTarget)

  const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'
  const useHotReload = process.env.HOT_RELOAD === 'true'

  // webpack configurations
  const configs = getWebpackConfigs(options)
  // the main app config is at the first position
  const appConfig = configs[0]
  appConfig.bail = false // disable bail when watching
  appConfig.output = Object.assign({}, appConfig.output, {
    filename: '[name][hash].bundle.js',
    publicPath: `http://${host}:${port}/`
  })
  // related issue for HMR
  // entry points https://github.com/webpack/webpack-dev-server/issues/1377
  // WebpackDevServer.addDevServerEntrypoints seems to not working correctly
  // with our configuration, so we add them manually
  if (useHotReload && appConfig.entry) {
    if (Array.isArray(appConfig.entry.app)) {
      appConfig.entry.app = [
        `webpack-dev-server/client?http://${host}:${port}/`,
        'webpack/hot/dev-server'
      ].concat(appConfig.entry.app)
    }
    if (Array.isArray(appConfig.entry.intents)) {
      appConfig.entry.intents = [
        `webpack-dev-server/client?http://${host}:${port}/`,
        'webpack/hot/dev-server'
      ].concat(appConfig.entry.intents)
    }
  }

  const WebpackOptions = {
    stats: {
      // display modules
      modules: isDebugMode,
      // display chunks
      chunks: isDebugMode,
      // Shows colors in the console
      colors: true
    },
    // should always be the same than the webpack config publicPath
    publicPath: appConfig.output.publicPath,
    inline: true,
    hot: useHotReload,
    host,
    port,
    headers: useHotReload ? {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization'
    } : {}
  }

  const compiler = webpack(appConfig)
  const server = new WebpackDevServer(compiler, WebpackOptions)

  server.listen(port, host, err => {
    console.log()
    if (err) {
      server.close()
      throw new Error(colorize.red(err))
    }
    console.log(colorize.green(`Your app is running at http://${host}:${port}`))
  })
}
