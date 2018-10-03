'use strict'

const webpack = require('webpack')
const spawn = require('cross-spawn')
const fs = require('fs-extra')
const WebpackDevServer = require('webpack-dev-server')
const colorize = require('../utils/_colorize')
const cleanBuild = require('../utils/cleanBuild')
const paths = require('../utils/paths')
const getWebpackConfigs = require('./config')

let appManifest = null
if (fs.pathExistsSync(paths.appManifest)) {
  appManifest = fs.readJsonSync(paths.appManifest, { throws: false })
}

const port = process.env.DEV_PORT || '8888'
const host = process.env.DEV_HOST || 'localhost'
const coudhDBPort = '5984'
const MailHogPort = '8025'
const cozyDomain = 'cozy.tools:8080'
const appSlug = (appManifest && appManifest.slug) || 'app'

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

  const useHotReload = process.env.HOT_RELOAD === 'true'

  // webpack configurations
  const configs = getWebpackConfigs(options)
  // the main app config is at the first position
  const appConfig = configs[0]
  appConfig.bail = false // disable bail when watching
  appConfig.output = Object.assign({}, appConfig.output, {
    filename: '[name].[hash].js',
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
      modules: buildOptions.debugMode,
      // display chunks
      chunks: buildOptions.debugMode,
      // Shows colors in the console
      colors: true
    },
    // should always be the same than the webpack config publicPath
    publicPath: appConfig.output.publicPath,
    inline: true,
    hot: useHotReload,
    host,
    port,
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

  let dockerProcess = null
  let knownDockerError = null

  compiler.hooks.done.tap('Very end hook', () => {
    clearConsole()
    console.log()
    console.log(
      colorize.green.bold(
        `App successfully ${isFirstRun ? 'compiled' : 'updated'}!`
      )
    )
    console.log()
    if (buildOptions.stack) {
      console.log(
        `  ${colorize.bold(
          'Your application:'
        )}  http://${appSlug}.${cozyDomain}`
      )
      console.log(
        `  ${colorize.bold('Your local Cozy:')}     http://${cozyDomain}`
      )
      console.log(
        `  ${colorize.bold(
          'CouchDB:'
        )}             http://${host}:${coudhDBPort}/_utils`
      )
      console.log(
        `  ${colorize.bold(
          'MailHog:'
        )}             http://${host}:${MailHogPort}`
      )
      console.log(
        `  ${colorize.bold('Dev assets:')}          http://${host}:${port}`
      )
      console.log()
      if (isFirstRun) {
        // launch cozy-stack within docker cozy/cozy-app-dev
        dockerProcess = spawn(
          'docker',
          [
            'run',
            '--rm',
            '-p',
            '8080:8080',
            '-p',
            `${coudhDBPort}:5984`,
            '-p',
            `${MailHogPort}:8025`,
            '-v',
            `${paths.appBuild}:/data/cozy-app/${appSlug}`,
            '-v',
            `${paths.csDisableCSPConfig}:/etc/cozy/cozy.yaml`,
            'cozy/cozy-app-dev'
          ],
          {
            cwd: paths.appPath
          }
        )
        dockerProcess.stdout.on('data', data => {
          process.stdout.write(
            `${colorize.blue.bold('Cozy stack (docker):')} ${data}`
          )
        })

        dockerProcess.stderr.on('data', data => {
          process.stderr.write(
            `${colorize.red.bold('Cozy stack (docker):')} ${data}`
          )
        })
        dockerProcess.on('error', err => {
          console.log()
          process.stderr.write(
            `${colorize.red.bold('Cozy stack (docker):')} ${err}\n`
          )
          console.log()
          if (err.code === 'ENOENT') {
            process.stderr.write(
              colorize.red.bold('You seems to not having Docker installed.\n')
            )
            process.stderr.write(
              colorize.red.bold(
                'Be sure to have the `docker` CLI available in your environment.\n'
              )
            )
            process.stderr.write(
              colorize.red.bold(
                "The Cozy in docker won't be available during this start session.\n"
              )
            )
            process.stderr.write(
              colorize.red.bold('Please install Docker and then start again.\n')
            )
            knownDockerError = err
          }
        })
      }
    } else {
      console.log(
        `  ${colorize.bold('Dev assets:')}        http://${host}:${port}`
      )
    }
    isFirstRun = false
  })

  server.listen(port, host, err => {
    if (err) {
      server.close()
      throw new Error(colorize.red(err))
    }
  })
  ;['SIGINT', 'SIGQUIT', 'SIGTERM'].forEach(sig => {
    process.on(sig, () => {
      server.close()
      if (dockerProcess && !knownDockerError) {
        console.log()
        console.log(colorize.orange('Shutting down the stack...'))
        console.log()
        console.log(colorize.cyan('See you soon! 👋'))
        dockerProcess.stdout.destroy()
        dockerProcess.stderr.destroy()
        spawn.sync('sh', ['-c', '-m', paths.csQuitStackScript], {
          stdio: 'inherit'
        })
      } else {
        console.log()
        console.log(colorize.cyan('See you soon! 👋'))
      }
      process.exit(0)
    })
  })
}
