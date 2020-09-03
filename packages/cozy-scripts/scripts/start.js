'use strict'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const colorize = require('../utils/_colorize')
const cleanBuild = require('../utils/cleanBuild')
const paths = require('../utils/paths')
const CTS = require('../utils/constants.js')
const getWebpackConfigs = require('./config')

const port = process.env[CTS.PORT] || '8888'
const host = process.env[CTS.HOST] || 'localhost'

// There is no callback available on compiler here,
// it's not handled by webpack-dev-server 2.x
// see https://github.com/webpack/webpack-dev-server/issues/818
module.exports = buildOptions => {
  const buildTarget = buildOptions.target || 'browser'
  const options = Object.assign({}, buildOptions, {
    mode: buildOptions.mode || 'development',
    target: buildOptions.target || 'browser'
  })

  // remove build folder
  cleanBuild(buildTarget)

  const useHotReload = process.env[CTS.HOT] !== 'false'
  const isDebugMode = process.env[CTS.DEBUG] === 'true'

  // webpack configurations
  const configs = getWebpackConfigs(options)
  // the main app config is at the first position
  const appConfig = configs[0]
  appConfig.bail = false // disable bail when watching
  appConfig.output = Object.assign({}, appConfig.output, {
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
    // display build informations only in debug mode or if errors/warnings
    noInfo: !isDebugMode,
    contentBase: paths.appBuild(),
    stats: {
      // display modules in debugMode (muted by noInfo)
      modules: isDebugMode,
      // display chunks in debugMode (muted by noInfo)
      chunks: isDebugMode,
      // Shows colors in the console
      colors: true
    },
    // should always be the same than the webpack config publicPath
    publicPath: appConfig.output.publicPath,
    inline: true,

    // Necessary since we use the stack to serve our pages; otherwise
    // we have an "Invalid Host Header" error, and the hot reload does
    // not work
    allowedHosts: ['.cozy.tools'],

    hot: useHotReload,
    host,
    port,

    // Here is the trick about hot-reload:
    // We launch a webpack-dev-server but we write the computed build files to the disk to allow
    // the cozy-stack to serve them.
    writeToDisk: filePath => {
      // Copy only assets on disk, other files will be from memory (dev-server)
      // .js and .css files are more likely to be changed
      // than assets during development
      return /(?!(\.js|\.css))$/.test(filePath)
    },
    headers: useHotReload
      ? {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET, POST, PUT, DELETE, PATCH, OPTIONS',
          'Access-Control-Allow-Headers':
            'X-Requested-With, content-type, Authorization'
        }
      : {}
  }

  const compiler = webpack(appConfig)
  const server = new WebpackDevServer(compiler, WebpackOptions)

  let isFirstRun = true

  function clearConsole() {
    if (process.stdout.isTTY) process.stdout.write('\x1Bc')
  }

  // invalid here doesn't imply errors, it means 'bundle invalidated'
  compiler.hooks.invalid.tap('Reste before next compiling', () => {
    clearConsole()
    console.log()
    console.log('Compiling...')
    console.log()
  })

  compiler.hooks.done.tap('Very end hook', () => {
    clearConsole()
    console.log()
    console.log(
      colorize.green.bold(
        `App successfully ${isFirstRun ? 'compiled' : 'updated'}!`
      )
    )
    console.log()

    console.log(
      `  ${colorize.bold('Dev assets:')}        http://${host}:${port}`
    )
    isFirstRun = false
  })

  server.listen(port, host, err => {
    if (err) {
      server.close()
      throw new Error(colorize.red(err))
    }
  })
  ;['SIGINT', 'SIGQUIT', 'SIGTERM'].forEach(sig => {
    process.once(sig, () => {
      server.close()
      console.log(colorize.cyan('See you soon! 👋'))
      process.exit(0)
    })
  })
}
