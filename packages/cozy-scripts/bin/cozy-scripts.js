#! /usr/bin/env node

'use strict'

const commander = require('commander')
const pkg = require('../package.json')
const colorize = require('../utils/_colorize.js')
const getWebpackConfigs = require('../scripts/config')

let actionName
const program = new commander.Command(pkg.name)
  .description(
    `
    Available actions:
    - build: build your application once (Webpack)
    - watch: build your application and listen to changes to rebuild it automatically (Webpack)
    - standalone: build your application and serve it using Webpack dev server
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
  .option('--show-config', 'just print app final webpack config')
  .option('--debug', 'print more outputs for debugging')
  .option('--development', 'specify development build mode')
  .option('--hot', 'enable hot module reload (only for development)')
  .option('--production', 'specify production build mode')
  .option('--browser', 'specify browser build target')
  .option('--mobile', 'specify mobile build target')
  .option('--vue', 'to use scripts in a VueJS specific way (default (p)React)')
  .option(
    '--analyzer',
    'open an analyzer with an interactive treemap visualization of the contents of all builds'
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
  useVue: program.vue,
  debugMode: program.debug,
  bundleAnalyzer: program.analyzer,
  // all remaining arguments passed to the command
  cliArgs: process.argv.slice(3)
}

if (program.hot) {
  process.env.HOT_RELOAD = 'true'
}

if (program.showConfig) {
  console.log(JSON.stringify(getWebpackConfigs(options), null, 2))
  process.exit(0)
}

const availableScripts = [
  'build',
  'watch',
  'standalone',
  'test',
  'publish',
  'release'
]

if (availableScripts.includes(actionName)) {
  const scriptPath = `../scripts/${actionName}`
  const script = require(scriptPath)
  script(options)
} else {
  console.log(`cozy-scripts: unknown command ${colorize.cyan(actionName)}`)
}
