'use strict'

const jestAPI = require('jest')

function runJest(options) {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'test'
  const { cliArgs } = options

  jestAPI.run(cliArgs)
}

module.exports = runJest
