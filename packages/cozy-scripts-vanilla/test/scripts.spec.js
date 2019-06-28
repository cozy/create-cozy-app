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
  console.log('')
  console.log('')
  console.log(colorize.red('Kill signal detected. Graceful exit...'))
  cleanUp()
  process.exit(1)
})

jest.setTimeout(120000) // 120s timeout

function cleanUp() {
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
var readDeepDirSync = function(dir, filelist, parentPath = '') {
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
  '<APP_NAME>': appName,
  '<APP_SLUG>': appName,
  '<USERNAME_GH>': 'foo'
}

describe('App from cozy-scripts-vanilla', () => {
  beforeAll(() => {
    // create the app test folder
    fs.ensureDirSync(appPath)
    process.chdir(appPath)
    fs.writeJsonSync('./package.json', { name: appName })
    // install the scripts and run it, this part is normally handlded by create-cozy-app
    const args = ['add', '--exact'].concat([
      `cozy-scripts-vanilla@file:${path.join(
        rootPath,
        'packages',
        'cozy-scripts-vanilla'
      )}`
    ])
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

  it('should have the correct files outline', done => {
    const init = require(path.join(
      appPath,
      'node_modules',
      'cozy-scripts-vanilla',
      'scripts',
      'init.js'
    ))
    // run the initiallisation script
    init(
      appPath,
      appName,
      false,
      e => {
        console.log(
          colorize.red('The script exited for some reasons. The test failed.')
        )
        cleanUp()
        console.log(e)
        throw new Error(colorize.red('Scripts tests failed.'))
      },
      overrideData,
      () => {
        console.log(
          colorize.orange('Asserting created app content (files outline)...')
        )
        const generatedElements = readDeepDirSync(appPath)
        expect(generatedElements).toMatchSnapshot()
        // we use done() here to force waiting this callback call
        done()
      }
    )
  })
})
