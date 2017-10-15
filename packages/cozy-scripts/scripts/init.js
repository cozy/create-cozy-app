'use strict'

const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const spawn = require('cross-spawn')
const prompt = require('prompt')
const validateProjectName = require('validate-npm-package-name')

module.exports = function (appPath, appName, verbose, gracefulRootExit) {
  // informations needed to replace in templates
  /*
    <APP_NAME> (already provided with appName) : application name
    <SLUG_GH> : github project name (same as appName by default)
    <SLUG_NPM> : future npm slug name (same as appName by default)
    <APP_SHORT_DESCRIPTION> : application short description
    <APP_CATEGORY> : application category (empty by default)
    <USERNAME_GH> : github author (that will host the project) username
    <USER_EMAIL_GH> : github author (that will host the project) email
    <USER_WEBSITE> : author website
  */
  const promptProperties = [
    {
      name: '<SLUG_GH>',
      description: chalk.yellow('Github project name?'),
      conform: function (value) {
        return validateProjectName(value).validForNewPackages
      },
      message: 'Must be maily lowercase letters, digits or dashes (see NPM name requirements)',
      required: false,
      default: appName
    },
    {
      name: '<SLUG_NPM>',
      description: chalk.yellow('Future NPM slug name?'),
      conform: function (value) {
        return validateProjectName(value).validForNewPackages
      },
      message: 'Must be mainly lowercase letters, digits or dashes (see NPM name requirements).',
      required: false,
      default: appName
    },
    {
      name: '<APP_SHORT_DESCRIPTION>',
      description: chalk.yellow('Short description of your application?'),
      conform: function (value) { return value.length <= 500 },
      message: 'Required. Must be less than 500 characters',
      required: true
    },
    {
      name: '<APP_CATEGORY>',
      description: chalk.yellow('Category of your application'),
      required: false
    },
    {
      name: '<USERNAME_GH>',
      description: chalk.yellow('Your github username?'),
      pattern: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
      message: 'Must be valid github username',
      required: true
    },
    {
      name: '<USER_EMAIL_GH>',
      description: chalk.yellow('Your github email (for the application build deployment script)?'),
      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: 'Must be valid github username',
      required: true
    },
    {
      name: '<USER_WEBSITE>',
      description: chalk.yellow('Your website (optional)?'),
      pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
      message: 'Must be valid url',
      required: false
    }
  ]
  prompt.start()
  prompt.message = chalk.white('Question:')
  prompt.delimiter = ' '
  prompt.get(promptProperties, function (err, received) {
    const dataMap = new Map()
    if (err) {
      console.log(chalk.red(err))
      gracefulRootExit(err)
    } else {
      if (verbose) {
        console.log()
        console.log('Informations received:')
      }
      for (const propName in received) {
        dataMap.set(propName, received[propName])
        if (verbose) console.log(`\t${propName}: ${received[propName]}`)
      }
      dataMap.set('<APP_NAME>', appName) // add already provided app name
      try {
        run(appPath, dataMap, verbose)
      } catch (e) {
        gracefulExit(appPath)
        gracefulRootExit(e)
      }
    }
  })
}

function requireFileAsString (filename) {
  return fs.readFileSync(filename, 'utf8')
}

function run (appPath, dataMap, verbose) {
  const ownPackageName = require(
    path.join(__dirname, '..', 'package.json')
  ).name
  // paths
  const ownPath = path.join(appPath, 'node_modules', ownPackageName)
  const templatePath = path.join(ownPath, 'template')
  const templateAppPath = path.join(templatePath, 'app')
  // dependencies from create-cozy-app script
  const createdDeps = require(path.join(appPath, 'package.json')).dependencies
  // templates
  const templatePackage = require(path.join(templatePath, 'package.json'))
  const templateManifest = requireFileAsString(path.join(templatePath, 'manifest.webapp'))
  const templateContributing = requireFileAsString(path.join(templatePath, 'CONTRIBUTING.md'))
  const templateReadme = requireFileAsString(path.join(templatePath, 'README.md'))

  console.log()
  console.log('Building files...')
  // Create files from template (manifest, package...)
  /*
    We don't use <APP_NAME> as package template name in order to be
    able to update all dependencies of the app template, so we change it here
  */
  templatePackage.name = dataMap.get('<APP_NAME>')
  // merge generated app dependencies to template dependencies
  templatePackage.dependencies = Object.assign({}, templatePackage.dependencies, createdDeps)
  // utils
  const dataRegExp = new RegExp([...dataMap.keys()].join('|'), 'g')
  function replaceDataIn (string) {
    return string.replace(dataRegExp,
      function (matched) { return dataMap.get(matched) }
    )
  }
  // replace data in all templates
  const newPkg = replaceDataIn(JSON.stringify(templatePackage))
  const newManifest = replaceDataIn(templateManifest)
  const newReadme = replaceDataIn(templateReadme)
  const newContributing = replaceDataIn(templateContributing)

  console.log()
  console.log(`Copying in ${chalk.cyan(appPath)}`)
  // Copy app outline from template (template/app)
  const templateFiles = fs.readdirSync(templateAppPath)
  templateFiles.forEach(element => {
    fs.copySync(
      path.join(templateAppPath, element),
      path.join(appPath, element)
    )
    console.log(`${chalk.cyan(element)} copied.`)
  })

  // Write created files from templates
  fs.writeJsonSync(path.join(appPath, 'package.json'), JSON.parse(newPkg))
  console.log(`${chalk.cyan('package.json')} copied.`)
  fs.writeFileSync(path.join(appPath, 'manifest.webapp'), newManifest)
  console.log(`${chalk.cyan('manifest.webapp')} copied.`)
  fs.writeFileSync(path.join(appPath, 'README.md'), newReadme)
  console.log(`${chalk.cyan('README.md')} copied.`)
  fs.writeFileSync(path.join(appPath, 'CONTRIBUTING.md'), newContributing)
  console.log(`${chalk.cyan('CONTRIBUTING.md')} copied.`)

  // install all dependencies
  console.log()
  console.log('Installing app dependencies using Yarn...')
  console.log('(May take a while)')
  console.log()
  process.chdir(appPath)
  const command = 'yarn'
  const args = ['install']
  if (!verbose) {
    args.push('--silent')
    console.log()
    console.log()
  }
  spawn.sync(command, args, { stdio: 'inherit' })
  console.log()
  console.log('App dependencies installed.')
  console.log()
  console.log(chalk.green(`Great! Your application ${chalk.cyan(dataMap.get('<APP_NAME>'))} is ready! \\o/`))
}

function gracefulExit (appPath) {
  console.log()
  console.log(chalk.yellow('Cleaning generated app template elements'))
  const templateAppPath = path.join(path.join(__dirname, '..', 'template', 'app'))
  const templateFiles = fs.readdirSync(templateAppPath)
  const expectedGeneratedElements = [
    'package.json',
    'manifest.webapp',
    'README.md',
    'CONTRIBUTING.md',
    'yarn.lock',
    'node_modules'
  ].concat(templateFiles)
  const generatedElements = fs.readdirSync(path.join(appPath))
  if (generatedElements.length) {
    console.log(`Deleting generated files/folders from ${chalk.cyan(appPath)}`)
  }
  generatedElements.forEach(element => {
    expectedGeneratedElements.forEach(expected => {
      if (element === expected) {
        fs.removeSync(path.join(appPath, element))
        console.log(`\t- ${chalk.cyan(element)} deleted.`)
      }
    })
  })
  if (generatedElements.length) {
    console.log()
  }
  const remainingElements = fs.readdirSync(path.join(appPath))
  if (remainingElements.length) { // folder empty, so we can delete it
    console.log(`Some unexpected elements are remaining:`)
    remainingElements.forEach(element => {
      console.log(`\t- ${chalk.cyan(element)}`)
    })
  }
}
