'use strict'

const jestAPI = require('jest')

function runJest(options) {
  const { cliArgs } = options

  jestAPI.run(cliArgs)
}

module.exports = runJest
