'use strict'

const runGlobalPackageCLI = require('../utils/runGlobalPackageCLI')

function runCozyRelease (options) {
  const {
    cliArgs,
    debugMode
  } = options

  runGlobalPackageCLI('cozy-release', cliArgs, debugMode)
}

module.exports = runCozyRelease
