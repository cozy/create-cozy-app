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
  .option('--hot', 'enable hot module reload (only for development)')
  .option('--mobile', 'specify mobile build target')
  .option(
    '--no-stack',
    'disable docker stack launch when using `cozy-scripts start`'
  )
  .option('--production', 'specify production build mode')
  .option('--show-config', 'just print app final webpack config')
  .option('--vue', 'to use scripts in a VueJS specific way (default React)')
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
  // all arguments passed to the command (we remove the main command name)
  cliArgs: process.argv.slice(3)
}
;[
  // program property, environment variable name, content to set
  ['hot', 'HOT_RELOAD', true],
  ['fix', 'COZY_SCRIPTS_ESLINT_FIX', true],
  ['debug', 'COZY_SCRIPTS_DEBUG', true]
].map(toDefine => {
  if (program[toDefine[0]]) process.env[toDefine[1]] = toDefine[2]
})


if (program.showConfig) {
  console.log(JSON.stringify(getWebpackConfigs(options), null, 2))
  process.exit(0)
}

const availableScripts = [
  'build',
  'watch',
  'start',
  'test',
  'publish',
  'release',
  'lint'
]

// TODO: to remove in next major version
if (actionName === 'standalone') {
  console.log()
  console.log(
    colorize.orange('⚠️ `cozy-scripts standalone` has been replaced.')
  )
  console.log(
    colorize.orange(
      `Please use ${colorize.bold('`cozy-scripts start`')} instead. ⚠️`
    )
  )
  console.log()
}

if (availableScripts.includes(actionName)) {
  if (actionName === 'start') {
    // specific to this action
    options.stack = program.stack // specific behaviour of --no-* options
  }
  const scriptPath = `../scripts/${actionName}`
  const script = require(scriptPath)
  script(options)
} else {
  console.log(`cozy-scripts: unknown command ${colorize.cyan(actionName)}`)
}
