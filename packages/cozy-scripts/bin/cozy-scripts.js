#! /usr/bin/env node

'use strict'

const commander = require('commander')
const pkg = require('../package.json')
const colorize = require('../utils/_colorize.js')
const getWebpackConfigs = require('../scripts/config')

let actionName
const program = new commander.Command(pkg.name)
  .version(pkg.version)
  .arguments('<action-name>')
  .usage(`${colorize.blue('<action-name>')} [options]`)
  .action(name => {
    actionName = name
  })
  .option('--show-config', 'just print app final webpack config')
  .option('--debug', 'print more outputs for debugging')
  .option('--development', 'specify development build mode')
  .option('--production', 'specify production build mode')
  .option('--browser', 'specify browser build target')
  .option('--mobile', 'specify mobile build target')
  .option('--vue', 'to use scripts in a VueJS specific way (default (p)React)')
  .option('--analyzer', 'open an analyzer with an interactive treemap visualization of the contents of all builds')
  .parse(process.argv)

// build mode and target computing (overwritten by NODE_ENV)
const options = {
  mode:
    (program.production && 'production') ||
    (program.development && 'development') ||
    (actionName === 'build' && 'production') ||
    'development',
  target:
    (program.browser && 'browser') ||
    (program.mobile && 'mobile') ||
    'browser',
  useVue: program.vue,
  debugMode: program.debug,
  bundleAnalyzer: program.analyzer,
  // all remaining arguments passed to the command
  cliArgs: process.argv.slice(3)
}

if (program.showConfig) {
  console.log(JSON.stringify(
    getWebpackConfigs(options), null, 2)
  )
  process.exit(0)
}

const availableScripts = ['watch', 'build', 'standalone', 'test', 'publish']

if (availableScripts.includes(actionName)) {
  const scriptPath = `../scripts/${actionName}`
  const script = require(scriptPath)
  script(options)
} else {
  console.log(`cozy-scripts: unknown command ${colorize.cyan(actionName)}`)
}
