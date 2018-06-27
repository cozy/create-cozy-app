'use strict'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const colorize = require('../utils/_colorize')
const getWebpackConfigs = require('./config')

const port = process.env.DEV_PORT || '8888'
const host = process.env.DEV_HOST || 'localhost'

// There is no callback available on compiler here,
// it's not handled by webpack-dev-server 2.x
// see https://github.com/webpack/webpack-dev-server/issues/818
module.exports = (buildOptions) => {
  const options = Object.assign({}, buildOptions, {
    mode: buildOptions.mode || 'development',
    target: buildOptions.target || 'browser'
  })

  // webpack configurations
  const configs = getWebpackConfigs(options)
  // the main app config is at the first position
  const appConfig = configs[0]
  appConfig.bail = false // disable bail when watching
  appConfig.output = Object.assign({}, appConfig.output, {
    filename: '[name][hash].bundle.js',
    publicPath: `http://${host}:${port}/`
  })

  const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'
  const useHotReload = process.env.HOT_RELOAD === 'true'

  const WebpackOptions = {
    stats: {
      // display modules
      modules: isDebugMode,
      // display chunks
      chunks: isDebugMode,
      // Shows colors in the console
      colors: true
    },
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

  WebpackDevServer.addDevServerEntrypoints(appConfig, WebpackOptions)
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
