'use strict'

const runGlobalPackageCLI = require('../utils/runGlobalPackageCLI')

function runCozyAppPublish(options) {
  const { cliArgs } = options
  const isDebugMode = process.env.COZY_SCRIPTS_DEBUG === 'true'

  runGlobalPackageCLI('cozy-app-publish', cliArgs, isDebugMode)
}

module.exports = runCozyAppPublish
