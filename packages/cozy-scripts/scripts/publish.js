'use strict'

const runGlobalPackageCLI = require('../utils/runGlobalPackageCLI')

function runCozyAppPublish (options) {
  const {
    cliArgs,
    debugMode
  } = options

  runGlobalPackageCLI('cozy-app-publish', cliArgs, debugMode)
}

module.exports = runCozyAppPublish
