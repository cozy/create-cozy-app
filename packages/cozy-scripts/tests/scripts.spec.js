'use strict'

/* eslint-env jest */

const fs = require('fs-extra')
const path = require('path')
const colorize = require('../utils/_colorize.js')

const testFolder = '.tmp_test'
const rootPath = process.cwd()
const appName = 'test-app'
const testPath = path.join(rootPath, testFolder)
const appPath = path.join(testPath, appName)
const spawn = require('cross-spawn')

process.on('SIGINT', () => {
  console.log()
  console.log()
  console.log(colorize.red('Kill signal detected. Graceful exit...'))
  cleanUp()
  process.exit(1)
})

jest.setTimeout(120000) // 120s timeout

function cleanUp () {
  console.log(colorize.orange('Cleaning up generated files'))
  process.chdir(rootPath)
  fs.removeSync(testPath)
  console.log('Cleaned.')
}

// List all files in a directory recursively synchronously
const excludedFiles = [
  '.DS_Store',
  '.Spotlight-V100',
  '.Trashes',
  'ehthumbs.db',
  'Thumbs.db',
  'desktop.ini'
]
var readDeepDirSync = function (dir, filelist, parentPath = '') {
  const files = fs.readdirSync(dir)
  filelist = filelist || []
  files.forEach(file => {
    const fileOrDirPath = path.join(dir, file)
    // it's a folder (exception for node_modules, we consider it
    // as simple file here to avoid useless noise in snapshots)
    if (fs.statSync(fileOrDirPath).isDirectory() && file !== 'node_modules') {
      const parent = `${parentPath}${file}/`
      filelist = readDeepDirSync(`${fileOrDirPath}/`, filelist, parent)
    } else {
      if (!excludedFiles.includes(file)) filelist.push(`${parentPath}${file}`)
    }
  })
  return filelist
}

const overrideData = {
  '<SLUG_GH>': appName,
  '<SLUG_NPM>': appName,
  '<APP_SHORT_DESCRIPTION>': 'Application for tests',
  '<APP_CATEGORY>': 'test',
  '<USERNAME_GH>': 'foo',
  '<USER_EMAIL_GH>': 'mock@example.test',
  '<USER_WEBSITE>': 'mock.example.test'
}

function getConfig () {
  let appConfig = require(path.join(appPath, 'node_modules', 'cozy-scripts', 'scripts', 'config.js'))
  // we replace path to avoid environment specific snapshots
  // ex: paths like `/me/test/${testFolder}/...` will be `${testFolder}/...`
  const pathReplaceRegex = new RegExp(`"\\S*/${testFolder}/${appName}`, 'g')
  return JSON.stringify(appConfig, null, 2)
    .replace(pathReplaceRegex, `"${testFolder}/${appName}`)
}

describe('App', () => {
  beforeAll(() => {
    // create the app test folder
    fs.ensureDirSync(appPath)
    process.chdir(appPath)
    fs.writeJsonSync('./package.json', {name: appName})
    // install the scripts and run it, this part is normally handlded by create-cozy-app
    const args = ['add', '--exact'].concat([`cozy-scripts@file:${path.join(rootPath, 'packages', 'cozy-scripts')}`])
    spawn.sync('yarn', args, { stdio: 'inherit' })
  })

  beforeEach(() => {
    // reset NODE_ENV
    if (process.env.NODE_ENV) delete process.env.NODE_ENV
    jest.resetModules()
  })

  afterAll(() => {
    // clean up all
    cleanUp()
  })

  it('should have the correct files outline', (done) => {
    const init = require(path.join(appPath, 'node_modules', 'cozy-scripts', 'scripts', 'init.js'))
    // run the initiallisation script
    init(appPath, appName, false, (e) => {
      console.log(colorize.red('The script exited for some reasons. The test failed.'))
      cleanUp()
      console.log(e)
      throw new Error(colorize.red('Scripts tests failed.'))
    }, overrideData, () => {
      console.log(colorize.orange('Asserting created app content (files outline)...'))
      const generatedElements = readDeepDirSync(appPath)
      expect(generatedElements).toMatchSnapshot()
      // we use done() here to force waiting this callback call
      done()
    })
  })

  it('should have the correct config browser:development by default', () => {
    console.log(colorize.orange('Asserting configs...'))
    const appConfig = getConfig()
    expect(JSON.parse(appConfig)).toMatchSnapshot()
  })

  it('should have the correct config browser:development according to NODE_ENV=browser:development', () => {
    process.env.NODE_ENV = 'browser:development'
    const appConfig = getConfig()
    expect(JSON.parse(appConfig)).toMatchSnapshot()
  })

  it('should have the correct config browser:production according to NODE_ENV=browser:production', () => {
    process.env.NODE_ENV = 'browser:production'
    const appConfig = getConfig()
    expect(JSON.parse(appConfig)).toMatchSnapshot()
  })

  it('should have the correct config mobile:development according to NODE_ENV=mobile:development', () => {
    process.env.NODE_ENV = 'mobile:development'
    const appConfig = getConfig()
    expect(JSON.parse(appConfig)).toMatchSnapshot()
  })

  it('should have the correct config mobile:production according to NODE_ENV=mobile:production', () => {
    process.env.NODE_ENV = 'mobile:production'
    const appConfig = getConfig()
    expect(JSON.parse(appConfig)).toMatchSnapshot()
  })

  it('should run webpack.run correctly with build script', (done) => {
    console.log(colorize.orange('Testing cozy-scripts build script...'))
    process.env.NODE_ENV = 'browser:production'
    const build = require(path.join(appPath, 'node_modules', 'cozy-scripts', 'scripts', 'build.js'))
    expect(() => build(done)).not.toThrow()
  })

  it('should run webpack.watch correctly with watch script', (done) => {
    console.log(colorize.orange('Testing cozy-scripts watch script...'))
    process.env.NODE_ENV = 'browser:development'
    const watch = require(path.join(appPath, 'node_modules', 'cozy-scripts', 'scripts', 'watch.js'))
    expect(() => watch(watcher => {
      watcher.close()
      if (watcher.closed) {
        console.log(colorize.orange('Watch script closed correctly.'))
      } else {
        cleanUp()
        throw new Error(colorize.red('The watch script may not have been closed correctly'))
      }
      done()
    })).not.toThrow()
  })

  it('should pass all app tests with success', () => {
    console.log(colorize.orange('Running app tests...'))
    expect(() => {
      spawn.sync('yarn', ['test'], { stdio: 'inherit' })
    }).not.toThrow()
  })
})
