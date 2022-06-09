'use strict'

const spawn = require('cross-spawn')
const paths = require('../utils/paths')

function runESLint(options) {
  const { cliArgs } = options

  const lintProcess = spawn.sync(paths.csEslintBinary(), cliArgs, {
    stdio: 'inherit'
  })
  if (lintProcess.status !== 0) throw new Error('Linting script failed.')
}

module.exports = runESLint
