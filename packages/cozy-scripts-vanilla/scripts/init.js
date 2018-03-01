'use strict'

const fs = require('fs-extra')
const path = require('path')
const colorize = require('../utils/_colorize.js')
const prompt = require('prompt')
const validateProjectName = require('validate-npm-package-name')

// override is used only for test to skip prompt (cf prompt.override)
// successCallback is for now only used for the test assertions
module.exports = function (appPath, appName, verbose, gracefulRootExit, override, successCallback) {
  // informations needed to replace in templates
  /*
    <APP_SLUG> slug of the app, must be unique for the apps registry
    <APP_NAME> application full name
    <SLUG_GH> : github project name (same as appName by default)
    <USERNAME_GH> : github author (that will host the project) username
    <USER_WEBSITE> : author website
  */

  const promptProperties = [
    {
      name: '<APP_SLUG>',
      description: colorize.orange('Your app slug?'),
      conform: function (value) {
        return validateProjectName(value).validForNewPackages
      },
      message: 'Must be mainly lowercase letters, digits or dashes (see NPM name requirements).',
      required: false,
      default: appName
    },
    {
      name: '<APP_NAME>',
      description: colorize.orange('Your app full name?'),
      pattern: /^[0-9A-Za-z\s-]{3,}$/i,

      message: 'Can contain (3 or more) letters, digits, hyphens and spaces.',
      required: false,
      default: appName
    },
    {
      name: '<SLUG_GH>',
      description: colorize.orange('The Github project slug?'),
      conform: function (value) {
        return validateProjectName(value).validForNewPackages
      },
      message: 'Must be mainly lowercase letters, digits or dashes (see NPM name requirements)',
      required: false,
      default: appName
    },
    {
      name: '<USERNAME_GH>',
      description: colorize.orange('Your github username?'),
      pattern: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
      message: 'Must be valid github username',
      required: true
    },
    {
      name: '<USER_WEBSITE>',
      description: colorize.orange('Your website (optional)?'),
      pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/,
      message: 'Must be valid url',
      required: false
    }
  ]

  if (override) prompt.override = override

  prompt.start()
  prompt.message = colorize.bold('Question:')
  prompt.delimiter = ' '
  prompt.get(promptProperties, function (err, received) {
    const dataMap = new Map()
    if (err) {
      console.log(colorize.red(err))
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
      try {
        run(appPath, dataMap, verbose, gracefulRootExit, successCallback)
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

function run (appPath, dataMap, verbose, gracefulRootExit, successCallback) {
  const ownPackageName = require(
    path.join(__dirname, '..', 'package.json')
  ).name

  // paths
  const ownPath = path.join(appPath, 'node_modules', ownPackageName)
  const templatePath = path.join(ownPath, 'template')
  const templateAppPath = path.join(templatePath, 'app')
  // templates
  const templateManifest = requireFileAsString(path.join(templatePath, 'manifest.webapp'))
  const templateReadme = requireFileAsString(path.join(templatePath, 'README.md'))
  const templateIndexHtml = requireFileAsString(path.join(templatePath, 'index.html'))
  const templateView2Html = requireFileAsString(path.join(templatePath, 'view2.html'))

  console.log()
  console.log('Building files...')
  // Create files from template (manifest, package...)
  // utils
  const dataRegExp = new RegExp([...dataMap.keys()].join('|'), 'g')
  function replaceDataIn (string) {
    return string.replace(dataRegExp,
      function (matched) { return dataMap.get(matched) }
    )
  }
  // replace data in all templates
  const newManifest = replaceDataIn(templateManifest)
  const newReadme = replaceDataIn(templateReadme)
  const newIndexHtml = replaceDataIn(templateIndexHtml)
  const newView2Html = replaceDataIn(templateView2Html)

  console.log()
  console.log(`Copying in ${colorize.cyan(appPath)}`)
  // Copy app outline from template (template/app)
  const templateFiles = fs.readdirSync(templateAppPath)
  templateFiles.forEach(element => {
    // We don't directly use .gitignore as file name to prevent npm from
    // renaming it to .npmignore, so we rename it to .gitignore here
    // See: https://github.com/npm/npm/issues/1862
    const targetName = element === 'gitignore' ? '.gitignore' : element
    fs.copySync(
      path.join(templateAppPath, element),
      path.join(appPath, targetName)
    )
    console.log(`${colorize.cyan(targetName)} copied.`)
  })

  // Write created files from templates
  fs.writeFileSync(path.join(appPath, 'manifest.webapp'), newManifest)
  console.log(`${colorize.cyan('manifest.webapp')} copied.`)
  fs.writeFileSync(path.join(appPath, 'README.md'), newReadme)
  console.log(`${colorize.cyan('README.md')} copied.`)
  fs.writeFileSync(path.join(appPath, 'index.html'), newIndexHtml)
  console.log(`${colorize.cyan('index.html')} copied.`)
  fs.writeFileSync(path.join(appPath, 'view2.html'), newView2Html)
  console.log(`${colorize.cyan('view2.html')} copied.`)

  // Since it's a vanilla application, we don't need node dependencies anymore
  fs.removeSync(path.join(appPath, 'package.json'))
  fs.removeSync(path.join(appPath, 'node_modules'))
  fs.removeSync(path.join(appPath, 'yarn.lock'))

  console.log()
  console.log(colorize.green(`Great! Your application ${colorize.cyan(dataMap.get('<APP_NAME>'))} is ready! \\o/. Enjoy it!`))
  if (typeof successCallback === 'function') successCallback()
}

function gracefulExit (appPath) {
  console.log()
  console.log(colorize.orange('Cleaning generated app template elements'))
  const templateAppPath = path.join(path.join(__dirname, '..', 'template', 'app'))
  const templateFiles = fs.readdirSync(templateAppPath)
  const expectedGeneratedElements = [
    'manifest.webapp',
    'README.md',
    'index.html',
    'view2.html'
  ].concat(templateFiles)
  const generatedElements = fs.readdirSync(path.join(appPath))
  if (generatedElements.length) {
    console.log(`Deleting generated files/folders from ${colorize.cyan(appPath)}`)
  }
  generatedElements.forEach(element => {
    expectedGeneratedElements.forEach(expected => {
      if (element === expected) {
        fs.removeSync(path.join(appPath, element))
        console.log(`\t- ${colorize.cyan(element)} deleted.`)
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
      console.log(`\t- ${colorize.cyan(element)}`)
    })
  }
}
