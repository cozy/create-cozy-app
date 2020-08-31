#! /usr/bin/env node

'use strict'

const commander = require('commander')
const pkg = require('../package.json')
const colorize = require('../utils/_colorize.js')
const CTS = require('../utils/constants.js')
const regexpReplacer = require('../utils/regexpReplacer')
const getWebpackConfigs = require('../scripts/config')

let actionName
const program = new commander.Command(pkg.name)
  .description(
    `
    Available actions:
    - build: build your application once (Webpack)
    - watch: build your application and listen to changes to rebuild it automatically (Webpack)
    - start: build your application and serve it inside a Cozy using Docker (with HMR)
    - test: run your tests using Jest
    - publish: run cozy-app-publish package (cf cozy-app-publish documentation)
    - release: run cozy-release to manage an app version release (cf cozy-release documentation)
    `
  )
  .version(pkg.version)
  .arguments('<action-name>')
  .usage(`${colorize.blue('<action-name>')} [options]`)
  .action(name => {
    actionName = name
  })
  .option('--browser', 'specify browser build target')
  .option('--debug', 'print more outputs for debugging')
  .option('--development', 'specify development build mode')
  .option('--fix', 'format automatically the code with eslint')
  .option('--no-hot', 'disables hot module reload (only for development)')
  .option(
    '--stack',
    'use cozy-stack with docker launch when using `cozy-scripts start`',
    false
  )
  .option(
    '--port  <portNumber>',
    'change the webpack dev server port (default 8888) (only for development)'
  )
  .option(
    '--host  <hostName>',
    'change the webpack dev server host name (default localhost) (only for development)'
  )
  .option('--mobile', 'specify mobile build target')
  .option('--production', 'specify production build mode')
  .option('--show-config', 'just print app final webpack config')
  .option(
    '--config <pathToFile>',
    'provide a custom cozy-scripts build config file path (relative to the application root directory). Use it only if you need custom build configuration using app.config.js with a custom location.'
  )
  .option(
    '--src-dir <pathToDirectory>',
    'provide the application source (`src`) directory path (relative to the application root directory)'
  )
  .option(
    '--build-dir <pathToDirectory>',
    'provide the application `build` directory path (relative to the application root directory) to build the application into'
  )
  .option(
    '--manifest <pathToFile>',
    'provide the application manifest file path (relative to the application root directory)'
  )
  .option(
    '--analyzer',
    'open an analyzer with an interactive treemap visualization of the contents of all builds'
  )
  .option(
    '--devtool',
    'Configure the devtool used. Use false to deactivate completely'
  )
  .parse(process.argv)

// build mode and target computing (overwritten by NODE_ENV)
const options = {
  mode:
    (program.production && 'production') ||
    (program.development && 'development') ||
    (actionName === 'build' && 'production') ||
    'development',
  target:
    (program.browser && 'browser') || (program.mobile && 'mobile') || 'browser',
  // all arguments passed to the command (we remove the main command name)
  cliArgs: process.argv.slice(3)
}

const getEnvVarsFromCLIArgs = program => {
  const env = {}
  // program property, environment variable name, content to set
  ;[
    ['hot', CTS.HOT, true],
    ['port', CTS.PORT, program.port],
    ['host', CTS.HOST, program.host],
    ['fix', CTS.ESLINT_FIX, true],
    ['debug', CTS.DEBUG, true],
    ['analyzer', CTS.ANALYZER, true],
    ['config', CTS.CONFIG, program.config],
    ['srcDir', CTS.SRC_DIR, program.srcDir],
    ['buildDir', CTS.BUILD_DIR, program.buildDir],
    ['manifest', CTS.MANIFEST, program.manifest],
    ['devtool', CTS.DEVTOOL, program.devtool]
  ].map(toDefine => {
    if (program[toDefine[0]] !== undefined) {
      env[toDefine[1]] = toDefine[2]
    }
  })
  return env
}

const envVars = getEnvVarsFromCLIArgs(program)
Object.assign(process.env, envVars)

if (program.showConfig) {
  console.log(JSON.stringify(getWebpackConfigs(options), regexpReplacer, 2))
} else {
  const availableScripts = [
    'build',
    'watch',
    'start',
    'test',
    'publish',
    'release',
    'lint',
    'check-locales'
  ]

  if (availableScripts.includes(actionName)) {
    if (actionName === 'start') {
      // specific to this action
      options.stack = program.stack // specific behaviour of --no-* options
    }
    const scriptPath = `../scripts/${actionName}`
    const script = require(scriptPath)
    script(options)
  } else {
    if (!actionName) {
      console.error(
        'Use `--help` option to get more informations about cozy-scripts usage.'
      )
    } else {
      console.error(
        `cozy-scripts: unknown command ${colorize.cyan(actionName)}`
      )
    }
  }
}
