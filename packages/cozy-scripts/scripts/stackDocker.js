'use strict'

const spawn = require('cross-spawn')

const paths = require('../utils/paths')

function runDockerImage(options) {
  const { cliArgs } = options
  let COZY_DISABLE_CSP = 1
  if (cliArgs && cliArgs[0] === 'prod') {
    COZY_DISABLE_CSP = 0
  }
  const dockerProcess = spawn.sync(
    'docker',
    [
      'run',
      '--rm',
      '-it',
      '-p',
      '8080:8080',
      '-p',
      '5984:5984',
      '-e',
      `COZY_DISABLE_CSP=${COZY_DISABLE_CSP}`,
      '-v',
      `${paths.appBuild()}:/data/cozy-app/app`,
      'cozy/cozy-app-dev'
    ],
    {
      stdio: 'inherit'
    }
  )
  if (dockerProcess.status !== 0) throw new Error('Docker script failed.')
}

module.exports = runDockerImage
