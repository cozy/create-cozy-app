'use strict'

const chalk = require('chalk')
const commander = require('commander')
const path = require('path')
const validateProjectName = require('validate-npm-package-name')
const fs = require('fs-extra')
const spawn = require('cross-spawn')

const pkg = require('./package.json')
let projectName = null

const program = new commander.Command(pkg.name)
  .version(pkg.version)
  .arguments('<project-name>')
  .usage(`${chalk.blue('<project-name>')} [options]`)
  .action(name => {
    projectName = name
  })
  .on('--help|-h', () => {
    console.log(`\tOnly ${chalk.blue('<project>')} is required.`)
    console.log(`\tThis command will automatically create the project, in a new folder or in a empty existing folder ('.git' allowed).`)
    console.log('\tAny issue? Do not hesitate to let us know:')
    console.log(
      `\t${chalk.cyan(
        'https://github.com/CPatchane/cozy-create-app/issues/new'
      )}`
    )
    console.log()
  })
  .parse(process.argv)

if (!projectName) {
  console.log('Please specify the project name:')
  console.log(
    `\t${chalk.cyan(program.name())} ${chalk.blue('<project-name>')}`
  )
  console.log()
  console.log('Here is an example of usage:')
  console.log(`\t${chalk.cyan(program.name())} ${chalk.blue('my-cozy-app')}`)
  console.log()
  process.exit(1)
}

createApp(projectName)

function createApp (name) {
  const rootPath = path.resolve(name)
  const appName = path.basename(rootPath)

  checkAppName(appName)
  ensureProjectFolder(rootPath)

  console.log(`Let's create the Cozy Application in ${chalk.blue(rootPath)}`)
  console.log()

  // move to project directory
  process.chdir(rootPath)

  bootstrapApp(rootPath, appName)
}

function printErrorsList (errors) {
  if (errors) errors.forEach(e => { console.log(chalk.red(`\t - ${e}`)) })
}

function checkAppName (appName) {
  const validationResult = validateProjectName(appName)
  if (!validationResult.validForNewPackages) {
    console.log(
      `Could not create a project called ${chalk.red(
        `"${appName}"`
      )} because of npm naming restrictions:`
    )
    printErrorsList(validationResult.errors)
    printErrorsList(validationResult.warnings)
    process.exit(1)
  }
  if (appName === 'cozy-scripts' || appName === 'cozy-create-app') {
    console.log(
      `Could not create a project called ${chalk.red(`"${appName}"`)}. Please change it.`
    )
    process.exit(1)
  }
}

function ensureProjectFolder (folderPath) {
  try {
    fs.ensureDirSync(folderPath) // create folder if it doesn't exist
    const dir = fs.readdirSync(folderPath)
    const acceptedExistingFiles = ['.git', '.DS_Store', 'Thumbs.db']
    const conflicts = dir.filter(file => !acceptedExistingFiles.includes(file))
    if (conflicts.length < 1) return true // no conflicts files
    console.log(`The directory ${chalk.blue(folderPath)} contains unexpected files:`)
    for (const file of conflicts) {
      console.log(`\t${file}`)
    }
    console.log('Please use a non-existing folder name or remove these files.')
    process.exit(1)
  } catch (e) {
    console.log(
      `An error occurred when creating ${chalk.red(`"${folderPath}"`)} folder:`
    )
    console.log(e.message)
    process.exit(1)
  }
}

function bootstrapApp (rootPath, appName) {
  console.log(
    `Installing ${chalk.cyan('cozy-scripts')}`
  )
  console.log()
  install(['cozy-scripts'])
  .then(() => {
    console.log(
      `${chalk.cyan('cozy-scripts')} installed.`
    )
    console.log()
    console.log(
      `Bootsraping the application ${chalk.blue(appName)}`
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
    init(rootPath, appName)
  })
  .catch(error => {
    console.log('An error occured during installation. Aborting.')
    if (error.command) {
      console.log(`\t${chalk.cyan(error.command)} has failed.`)
    } else {
      console.log(chalk.red('Unexpected error. Please report it as a bug:'))
      console.log(error)
    }
    console.log()
  })
}

function install (dependencies) {
  return new Promise((resolve, reject) => {
    const command = 'yarn'
    const args = ['add', '--exact'].concat(dependencies)

    const installProcess = spawn(command, args, { stdio: 'inherit' })
    installProcess.on('close', code => {
      if (code !== 0) return reject({ command: `${command} ${args.join(' ')}` })
      resolve()
    })
  })
}
