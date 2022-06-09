'use strict'

const { spawnSync } = require('child_process')

function runCozyAppPublish(options) {
  const { cliArgs } = options
  spawnSync('npx', ['cozy-app-publish', ...cliArgs], { stdio: 'inherit' })
}

module.exports = runCozyAppPublish
