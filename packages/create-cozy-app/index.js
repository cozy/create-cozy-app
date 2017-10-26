#!/usr/bin/env node

'use strict'

var chalk = require('chalk')

var currentNodeVersion = process.versions.node
var semver = currentNodeVersion.split('.')
var major = semver[0]
const execSync = require('child_process').execSync

if (major < 6) {
  console.error(
    chalk.red(`You are running Node v${currentNodeVersion}.
      create-cozy-app requires Node v6 minimum, please update you version of Node`
    )
  )
  process.exit(1)
}

try {
  execSync('yarn --version', { stdio: 'ignore' })
} catch (e) {
  console.error(chalk.red(
    `create-cozy-app need yarn (https://yarnpkg.com) to run correctly.\nPlease install yarn before using create-cozy-app (https://yarnpkg.com/en/docs/install)`
  ))
  process.exit(1)
}

require('./create-cozy-app.js')
