#!/usr/bin/env node

'use strict'

var chalk = require('chalk')

var currentNodeVersion = process.versions.node
var semver = currentNodeVersion.split('.')
var major = semver[0]

if (major < 6) {
  console.error(
    chalk.red(`You are running Node v${currentNodeVersion}.
      cozy-create-app requires Node v6 minimum, please update you version of Node`
    )
  )
  process.exit(1)
}

require('./cozy-create-app.js')
