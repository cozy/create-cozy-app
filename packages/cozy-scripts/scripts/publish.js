'use strict'

const runGlobalPackageCLI = require('../utils/runGlobalPackageCLI')
const CTS = require('../utils/constants.js')

function runCozyAppPublish(options) {
  const { cliArgs } = options
  const isDebugMode = process.env[CTS.DEBUG] === 'true'

  runGlobalPackageCLI('cozy-app-publish', cliArgs, isDebugMode)
}

module.exports = runCozyAppPublish
