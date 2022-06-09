'use strict'

const { spawnSync } = require('child_process')

function runCozyRelease(options) {
  const { cliArgs } = options
  spawnSync('npx', ['cozy-release', ...cliArgs], { stdio: 'inherit' })
}

module.exports = runCozyRelease
