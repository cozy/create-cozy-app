'use strict'

const jestAPI = require('jest')
const fs = require('fs-extra')
const paths = require('../utils/paths')

function runJest (options) {
  const {
    cliArgs
  } = options

  if (fs.existsSync(paths.jestConfig)) {
    cliArgs.push('--config', paths.jestConfig)
  }
  jestAPI.run(cliArgs)
}

module.exports = runJest
