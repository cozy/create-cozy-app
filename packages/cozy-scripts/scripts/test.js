'use strict'

const jestAPI = require('jest')
const fs = require('fs-extra')
const paths = require('../utils/paths')

function runJest (options) {
  const {
    testArgs
  } = options

  const cliArguments = testArgs

  if (fs.existsSync(paths.jestConfig)) {
    cliArguments.push('--config', paths.jestConfig)
  }
  jestAPI.run(cliArguments)
}

module.exports = runJest
