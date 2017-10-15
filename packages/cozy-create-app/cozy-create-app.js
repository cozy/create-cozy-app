'use strict'

const commander = require('commander')
const path = require('path')
const validateProjectName = require('validate-npm-package-name')
const fs = require('fs-extra')
const spawn = require('cross-spawn')
const ora = require('ora')
const colorize = require('./_colorize.js')
const cozyAscii = require('./_cozyIoAscii.js')

const pkg = require('./package.json')
let projectName = null

process.on('SIGINT', () => {
  console.log()
  console.log()
  console.log(colorize.red('Kill signal detected. Graceful exit...'))
  const rootPath = path.resolve('.')
  const appName = path.parse(rootPath).name
  gracefulExit(rootPath, appName)
  process.exit(1)
})

const program = new commander.Command(pkg.name)
  .version(pkg.version)
  .arguments('<project-name>')
  .usage(`${colorize.blue('<project-name>')} [options]`)
  .action(name => {
    projectName = name
  })
  .option('--verbose', 'print additional logs')
  .on('--help|-h', () => {
    console.log(`\tOnly ${colorize.blue('<project>')} is required.`)
    console.log(`\tThis command will automatically create the project, in a new folder or in a empty existing folder ('.git' allowed).`)
    console.log('\tAny issue? Do not hesitate to let us know:')
    console.log(
      `\t${colorize.cyan(
        'https://github.com/CPatchane/cozy-create-app/issues/new'
      )}`
    )
    console.log()
  })
  .parse(process.argv)

if (!projectName) {
  console.log('Please specify the project name:')
  console.log(
    `\t${colorize.cyan(program.name())} ${colorize.blue('<project-name>')}`
  )
  console.log()
  console.log('Here is an example of usage:')
  console.log(`\t${colorize.cyan(program.name())} ${colorize.blue('my-cozy-app')}`)
  console.log()
  process.exit(1)
}

createApp(projectName, program.verbose)

function createApp (name, verbose) {
  const rootPath = path.resolve(name)
  const appName = path.basename(rootPath)

  checkAppName(appName)
  ensureProjectFolder(rootPath)

  console.log(colorize.blue(cozyAscii))
  console.log(`Let's create the Cozy Application in ${colorize.white.bold(rootPath)}`)
  console.log()

  // move to project directory
  process.chdir(rootPath)

  bootstrapApp(rootPath, appName, verbose)
}

function printErrorsList (errors) {
  if (errors) errors.forEach(e => { console.log(colorize.red(`\t - ${e}`)) })
}

function checkAppName (appName) {
  const validationResult = validateProjectName(appName)
  if (!validationResult.validForNewPackages) {
    console.log(
      `Could not create a project called ${colorize.red(
        `"${appName}"`
      )} because of npm naming restrictions:`
    )
    printErrorsList(validationResult.errors)
    printErrorsList(validationResult.warnings)
    process.exit(1)
  }
  if (appName === 'cozy-scripts' || appName === 'cozy-create-app') {
    console.log(
      `Could not create a project called ${colorize.red(`"${appName}"`)}. Please change it.`
    )
    process.exit(1)
  }
}

function ensureProjectFolder (folderPath) {
  try {
    fs.ensureDirSync(folderPath) // create folder if it doesn't exist
    const dir = fs.readdirSync(folderPath)
    const acceptedExistingFiles = [
      '.git',
      '.DS_Store',
      'Thumbs.db'
    ]
    const conflicts = dir.filter(file => !acceptedExistingFiles.includes(file))
    if (conflicts.length < 1) return true // no conflicts files
    console.log(`The directory ${colorize.blue(folderPath)} contains unexpected files:`)
    for (const file of conflicts) {
      console.log(`\t- ${colorize.red(file)}`)
    }
    console.log('Please use a non-existing folder name or remove these files.')
    process.exit(1)
  } catch (e) {
    console.log(
      `An error occurred when creating ${colorize.red(`"${folderPath}"`)} folder:`
    )
    console.log(e.message)
    process.exit(1)
  }
}

function bootstrapApp (rootPath, appName, verbose) {
  let installingSpinner
  if (verbose) {
    console.log(`Installing ${colorize.cyan('cozy-scripts')}... (may take a while)`)
  } else {
    installingSpinner = ora({
      text: `Installing ${colorize.cyan('cozy-scripts')}... (may take a while)`,
      spinner: 'bouncingBall',
      color: 'yellow'
    }).start()
  }

  // create a package.json here to avoid being detected as subdirectory
  // by yarn and add deps to parent
  fs.writeJsonSync('./package.json', {name: appName})
  install(['cozy-scripts'], verbose)
  .then(() => {
    installingSpinner && installingSpinner.succeed(`${colorize.cyan('cozy-scripts')} installed.`)
    console.log()
    console.log(
      `Starting the application ${colorize.cyan(appName)} bootstrap`
    )
    console.log()
    // use the create script from cozy-scripts
    const initScriptPath = path.resolve(
      process.cwd(),
      'node_modules',
      'cozy-scripts',
      'scripts',
      'init.js'
    )
    const init = require(initScriptPath)
    init(rootPath, appName, verbose, function (error) {
      gracefulExit(rootPath, appName, error)
    })
  })
  .catch(error => {
    installingSpinner && installingSpinner.fail(`An error occured during ${colorize.cyan(appName)} initialisation. Aborting.`)
    if (error.command) {
      console.log(`${colorize.cyan(error.command)} has failed.`)
    } else {
      console.log(colorize.red('Unexpected error. Please report it as a bug:'))
      console.log(error)
    }
    gracefulExit(rootPath, appName)
  })
}

function install (dependencies, verbose) {
  return new Promise((resolve, reject) => {
    const command = 'yarn'
    const args = ['add', '--exact'].concat(dependencies)

    // disable output here using pipe stdio
    const installProcess = spawn(command, args, {
      stdio: verbose ? 'inherit' : 'pipe'
    })
    installProcess.on('close', code => {
      // eslint-disable-next-line
      if (code !== 0) return reject({ command: `${command} ${args.join(' ')}` })
      resolve()
    })
  })
}

function gracefulExit (rootPath, appName, error) {
  console.log()
  console.log(colorize.yellow('Cleaning remaining generated elements'))
  const expectedGeneratedElements = [
    'package.json',
    'npm-debug.log',
    'yarn-error.log',
    'yarn-debug.log',
    'node_modules',
    'yarn.lock'
  ]
  const generatedElements = fs.readdirSync(path.join(rootPath))
  if (generatedElements.length) {
    console.log(`Deleting generated files/folders from ${colorize.cyan(rootPath)}`)
  }
  generatedElements.forEach(element => {
    expectedGeneratedElements.forEach(expected => {
      if (element === expected) {
        fs.removeSync(path.join(rootPath, element))
        console.log(`\t- ${colorize.cyan(element)} deleted.`)
      }
    })
  })
  if (generatedElements.length) {
    console.log()
  }
  const remainingElements = fs.readdirSync(path.join(rootPath))
  if (!remainingElements.length) { // folder empty, so we can delete it
    process.chdir(path.resolve(rootPath, '..'))
    fs.removeSync(path.join(rootPath))
    console.log(`${colorize.cyan(`${appName}/`)} empty folder deleted.`)
  } else {
    console.log(`Can't delete ${colorize.cyan(`${appName}/`)} folder. Some unexpected files are remaining:`)
    remainingElements.forEach(element => {
      console.log(`\t- ${colorize.cyan(element)}`)
    })
  }
  if (error) {
    console.log()
    console.log(colorize.red('ERROR:'))
    throw error
  }
  process.exit(1)
}
