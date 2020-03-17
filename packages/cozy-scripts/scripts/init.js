'use strict'

const fs = require('fs-extra')
const path = require('path')
const colorize = require('../utils/_colorize.js')
const spawn = require('cross-spawn')
const prompt = require('prompt')
const validateProjectName = require('validate-npm-package-name')

// override is used only for test to skip prompt (cf prompt.override)
// successCallback is for now only used for the test assertions
module.exports = function(
  appPath,
  appName,
  cliOptions,
  gracefulRootExit,
  override,
  successCallback
) {
  // informations needed to replace in templates
  /*
    <APP_SLUG> slug of the app, must be unique for the apps registry
    <APP_NAME> application full name
    <USERNAME_GH> : github author (that will host the project) username
  */
  const promptProperties = [
    {
      name: '<APP_SLUG>',
      description: colorize.orange('Your app slug?'),
      conform: function(value) {
        return validateProjectName(value).validForNewPackages
      },
      message:
        'Must be mainly lowercase letters, digits or dashes (see NPM name requirements).',
      required: false,
      default: appName
    },
    {
      name: '<APP_NAME>',
      description: colorize.orange('Your app full name?'),
      pattern: /^[0-9A-Za-z\s-]{3,}$/i,
      message: 'Can contain (3 or more) letters, digits, hyphens and spaces.',
      required: false,
      default: appName[0].toUpperCase() + appName.replace('-', ' ').slice(1)
    },
    {
      name: '<SLUG_GH>',
      description: colorize.orange('The Github project slug?'),
      conform: function(value) {
        return validateProjectName(value).validForNewPackages
      },
      message:
        'Must be mainly lowercase letters, digits or dashes (see NPM name requirements)',
      required: false,
      default: appName
    },
    {
      name: '<USERNAME_GH>',
      description: colorize.orange('Your github username?'),
      pattern: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
      message: 'Must be valid github username',
      required: true
    }
  ]

  if (override) prompt.override = override

  prompt.start()
  prompt.message = colorize.bold('Question:')
  prompt.delimiter = ' '
  prompt.get(promptProperties, function(err, received) {
    const dataMap = new Map()
    if (err) {
      console.log(colorize.red(err))
      gracefulRootExit(err)
    } else {
      if (cliOptions.verbose) {
        console.log()
        console.log('Informations received:')
      }
      for (const propName in received) {
        dataMap.set(propName, received[propName])
        if (cliOptions.verbose)
          console.log(`\t${propName}: ${received[propName]}`)
      }
      try {
        run(appPath, dataMap, cliOptions, gracefulRootExit, successCallback)
      } catch (e) {
        gracefulExit(appPath)
        gracefulRootExit(e)
      }
    }
  })
}

function requireFileAsString(filename) {
  return fs.readFileSync(filename, 'utf8')
}

function run(appPath, dataMap, cliOptions, gracefulRootExit, successCallback) {
  const ownPackageName = require(path.join(__dirname, '..', 'package.json'))
    .name
  const templateName = 'template'
  // paths
  const ownPath = path.join(appPath, 'node_modules', ownPackageName)
  const templatePath = path.join(ownPath, templateName)
  const templateAppPath = path.join(templatePath, 'app')
  // dependencies from create-cozy-app script
  const createdDeps = require(path.join(appPath, 'package.json')).dependencies
  // templates
  const templatePackage = require(path.join(templatePath, 'package.json'))
  const templateManifest = requireFileAsString(
    path.join(templatePath, 'manifest.webapp')
  )
  const templateContributing = requireFileAsString(
    path.join(templatePath, 'CONTRIBUTING.md')
  )
  const templateReadme = requireFileAsString(
    path.join(templatePath, 'README.md')
  )
  const templateTravisYaml = requireFileAsString(
    path.join(templatePath, '.travis.yml')
  )

  console.log()
  console.log('Building files...')
  // Create files from template (manifest, package...)
  /*
    We don't use <APP_SLUG> as package template name in order to be
    able to update all dependencies of the app template, so we change it here
  */
  templatePackage.name = dataMap.get('<APP_SLUG>')
  // merge generated app dependencies to template dependencies
  templatePackage.dependencies = Object.assign(
    {},
    templatePackage.dependencies,
    createdDeps
  )
  // remove private attribute (was used only for lerna)
  if (templatePackage.private) delete templatePackage.private
  // utils
  const dataRegExp = new RegExp([...dataMap.keys()].join('|'), 'g')
  function replaceDataIn(string) {
    return string.replace(dataRegExp, function(matched) {
      return dataMap.get(matched)
    })
  }
  // replace data in all templates
  const newPkg = replaceDataIn(JSON.stringify(templatePackage, null, 2))
  const newManifest = replaceDataIn(templateManifest)
  const newReadme = replaceDataIn(templateReadme)
  const newContributing = replaceDataIn(templateContributing)
  const newTravisYaml = replaceDataIn(templateTravisYaml)

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
  fs.writeFileSync(path.join(appPath, 'package.json'), newPkg)
  console.log(`${colorize.cyan('package.json')} copied.`)
  fs.writeFileSync(path.join(appPath, 'manifest.webapp'), newManifest)
  console.log(`${colorize.cyan('manifest.webapp')} copied.`)
  fs.writeFileSync(path.join(appPath, 'README.md'), newReadme)
  console.log(`${colorize.cyan('README.md')} copied.`)
  fs.writeFileSync(path.join(appPath, 'CONTRIBUTING.md'), newContributing)
  console.log(`${colorize.cyan('CONTRIBUTING.md')} copied.`)
  fs.writeFileSync(path.join(appPath, '.travis.yml'), newTravisYaml)
  console.log(`${colorize.cyan('.travis.yml')} copied.`)

  // install all dependencies
  console.log()
  console.log('Installing app dependencies using Yarn...')
  console.log('(May take a while)')
  console.log()
  process.chdir(appPath)
  installDependencies(cliOptions.verbose)
    .then(() => {
      console.log()
      console.log('App dependencies installed.')
      console.log()
      console.log(
        colorize.green(
          `Great! Your application ${colorize.cyan(
            dataMap.get('<APP_NAME>')
          )} is ready! \\o/. Enjoy it!`
        )
      )
      console.log(
        'You can also create an `app.config.js` file if you want to customize the webpack configuration.'
      )
      console.log()
      console.log('Next steps:')
      console.log(`  $ ${colorize.bold(`cd ${path.basename(appPath)}`)}`)
      console.log(`  $ ${colorize.bold('yarn start')}`)
      if (typeof successCallback === 'function') successCallback()
    })
    .catch(error => {
      gracefulExit(appPath)
      gracefulRootExit(error)
    })
}

function installDependencies(verbose) {
  return new Promise((resolve, reject) => {
    const command = 'yarn'
    const args = ['install', '--prefer-offline']
    if (!verbose) {
      args.push('--silent')
      console.log()
      console.log()
    }

    const installProcess = spawn(command, args, { stdio: 'inherit' })
    installProcess.on('close', code => {
      // eslint-disable-next-line
      if (code !== 0) return reject({ command: `${command} ${args.join(' ')}` })
      resolve()
    })
  })
}

function gracefulExit(appPath) {
  console.log()
  console.log(colorize.orange('Cleaning generated app template elements'))
  const templateAppPath = path.join(
    path.join(__dirname, '..', 'template', 'app')
  )
  const templateFiles = fs.readdirSync(templateAppPath)
  const expectedGeneratedElements = [
    '.travis.yml',
    '.gitignore',
    'CONTRIBUTING.md',
    'manifest.webapp',
    'node_modules',
    'package.json',
    'README.md',
    'yarn-error.log',
    'yarn.lock'
  ].concat(templateFiles)
  const generatedElements = fs.readdirSync(path.join(appPath))
  if (generatedElements.length) {
    console.log(
      `Deleting generated files/folders from ${colorize.cyan(appPath)}`
    )
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
  if (remainingElements.length) {
    // folder empty, so we can delete it
    console.log(`Some unexpected elements are remaining:`)
    remainingElements.forEach(element => {
      console.log(`\t- ${colorize.cyan(element)}`)
    })
  }
}
