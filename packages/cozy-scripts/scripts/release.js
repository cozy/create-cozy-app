'use strict'

const runGlobalPackageCLI = require('../utils/runGlobalPackageCLI')
const CTS = require('../utils/constants.js')

function runCozyRelease(options) {
  const { cliArgs } = options
  const isDebugMode = process.env[CTS.DEBUG] === 'true'

  runGlobalPackageCLI('cozy-release', cliArgs, isDebugMode)
}

module.exports = runCozyRelease
