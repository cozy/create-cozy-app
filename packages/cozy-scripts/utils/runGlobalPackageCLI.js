'use strict'

const spawn = require('cross-spawn')
const colorize = require('../utils/_colorize.js')

/*
  packageName: name of the modules, must be a VALID NPM PACKAGE NAME
  cliArguments: arguments to pass the module CLI
  debugMode: more logs if debug mode
*/
module.exports = function runGlobalPackageCLI(
  packageName,
  cliArguments = [],
  debugMode = null
) {
  // install the latest cozy-app-publish version globally
  console.log(
    colorize.blue(
      `Fetching the latest version of ${packageName}... (please wait)`
    )
  )
  const yarnAddProcess = spawn.sync(
    'yarn',
    ['global', 'add', `${packageName}@latest`, '--prefer-offline'],
    {
      stdio: debugMode ? 'inherit' : 'pipe'
    }
  )

  if (yarnAddProcess.status !== 0) {
    throw new Error(
      colorize.red(
        `Something went wrong when installing the latest version of '${packageName}'`
      )
    )
  }

  console.log(colorize.green(`${colorize.bold(packageName)} fetched.`))

  // the debug option is specific to cozy-scripts, we use --verbose instead here
  const argsAsString = cliArguments.join(' ').replace('--debug', '--verbose ')

  console.log()
  console.log(`$ ${packageName} ${argsAsString}`)

  const runPackageProcess = spawn.sync(
    'sh',
    ['-c', `$(yarn global bin)/${packageName} ${argsAsString}`],
    {
      stdio: 'inherit'
    }
  )

  if (runPackageProcess.status !== 0) {
    console.log()
    throw colorize.red(
      `Something went wrong when running '${packageName}'. Process aborted.`
    )
  }
}
