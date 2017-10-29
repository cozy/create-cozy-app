#! /usr/bin/env node

'use strict'

const commander = require('commander')
const pkg = require('../package.json')
const colorize = require('../utils/_colorize.js')
const appConfig = require('../scripts/config.js')

let actionName
const program = new commander.Command(pkg.name)
  .version(pkg.version)
  .arguments('<action-name>')
  .usage(`${colorize.blue('<action-name>')} [options]`)
  .action(name => {
    actionName = name
  })
  .option('--show-config', 'just print app final webpack config')
  .parse(process.argv)

if (program.showConfig) {
  console.log(JSON.stringify(appConfig, null, 2))
  process.exit(0)
}

const availableScripts = ['watch', 'build', 'standalone']

if (availableScripts.includes(actionName)) {
  const scriptPath = `../scripts/${actionName}`
  const script = require(scriptPath)
  script()
} else {
  console.log(`cozy-scripts: unknown command ${colorize.cyan(actionName)}`)
}
