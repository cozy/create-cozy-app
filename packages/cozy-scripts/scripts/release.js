'use strict'

const runGlobalPackageCLI = require('../utils/runGlobalPackageCLI')

function runCozyRelease(options) {
  const { cliArgs } = options
  const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'

  runGlobalPackageCLI('cozy-release', cliArgs, isDebugMode)
}

module.exports = runCozyRelease
