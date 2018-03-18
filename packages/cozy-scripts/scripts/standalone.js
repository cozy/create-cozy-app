'use strict'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const colorize = require('../utils/_colorize')
const getWebpackConfigs = require('./config')

// default NODE_ENV to browser development (standalone script)
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'browser:development'

const port = process.env.PORT || '8888'
const host = process.env.HOST || 'localhost'
const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'

const options = {
  stats: {
    modules: isDebugMode, // display modules
    chunks: isDebugMode, // display chunks
    colors: true // Shows colors in the console
  },
  inline: true,
  hot: true,
  host,
  port
}

// There is no callback available on compiler here,
// it's not handled by webpack-dev-server 2.x
// see https://github.com/webpack/webpack-dev-server/issues/818
module.exports = () => {
  // webpack configurations
  const configs = getWebpackConfigs()
  // the main app config is at the first position
  const appConfig = configs[0]
  appConfig.bail = false // disable bail when watching
  appConfig.output = {filename: '[name][hash].bundle.js'}
  const compiler = webpack(appConfig)

  WebpackDevServer.addDevServerEntrypoints(appConfig, options)
  const server = new WebpackDevServer(compiler, options)

  server.listen(port, host, err => {
    console.log()
    if (err) {
      server.close()
      throw new Error(colorize.red(err))
    }
    console.log(colorize.green(`Your app is running at http://${host}:${port}`))
  })
}
