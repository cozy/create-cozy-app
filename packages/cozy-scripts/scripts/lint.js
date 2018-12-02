'use strict'

const spawn = require('cross-spawn')
const paths = require('../utils/paths')

function runESLint(options) {
  const { cliArgs } = options

  spawn.sync(paths.csEslintBinary, cliArgs, { stdio: 'inherit' })
}

module.exports = runESLint
