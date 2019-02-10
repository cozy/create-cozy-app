/* eslint-env jest */

const fs = require('fs-extra')
const path = require('path')
const colorize = require('../utils/_colorize.js')
const CTS = require('../utils/constants.js')

const testFolder = '.tmp_test'
const rootPath = process.cwd()
const appName = 'test-app-vue'
const testPath = path.join(rootPath, testFolder)
const appPath = path.join(testPath, appName)
const appCoveragePath = path.join(appPath, 'coverage/')
const ownTestConfig = path.join(__dirname, 'lib', 'test.config.js')
const spawn = require('cross-spawn')

process.on('SIGINT', () => {
  console.log()
  console.log()
  console.log(colorize.red('Kill signal detected. Graceful exit...'))
  cleanUp()
  process.exit(1)
})

jest.setTimeout(360000) // 360s timeout

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
  '<APP_SLUG>': appName,
  '<APP_NAME>': appName,
  '<USERNAME_GH>': 'foo'
}

function getConfig(options = {}) {
  const getWebpackConfigs = require(path.join(
    appPath,
    'node_modules',
    'cozy-scripts',
    'scripts',
    'config.js'
  ))
  options.useVue = true
  let appConfig = getWebpackConfigs(options)
  // we replace path to avoid environment specific snapshots
  // ex: paths like `/me/test/${testFolder}/...` will be `${testFolder}/...`
  const pathReplaceRegex = new RegExp(`"\\S*/${testFolder}/${appName}`, 'g')
  return JSON.stringify(appConfig, null, 2).replace(
    pathReplaceRegex,
    `"${testFolder}/${appName}`
  )
}

describe('App from cozy-scripts with VueJS 2', () => {
  beforeAll(() => {
    // create the app test folder
    fs.ensureDirSync(appPath)
    process.chdir(appPath)
    fs.writeJsonSync('./package.json', { name: appName })
    // install the scripts and run it, this part is normally handlded by create-cozy-app
    const args = [
      'add',
      '--prefer-offline',
      '--exact' // always at the end
    ].concat([
      `cozy-scripts@file:${path.join(rootPath, 'packages', 'cozy-scripts')}`
    ])
    spawn.sync('yarn', args, { stdio: 'inherit' })
  })

  beforeEach(() => {
    // reset NODE_ENV
    if (process.env.NODE_ENV) delete process.env.NODE_ENV
    if (process.env[CTS.DEBUG]) delete process.env[CTS.DEBUG]
    if (process.env[CTS.CONFIG]) delete process.env[CTS.CONFIG]
    // rm coverage folder from tests if exists
    if (fs.existsSync(appCoveragePath)) {
      fs.removeSync(appCoveragePath)
    }
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
      'cozy-scripts',
      'scripts',
      'init.js'
    ))
    const options = { verbose: false, vue: true }
    // run the initiallisation script
    init(
      appPath,
      appName,
      options,
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

  it('should have the correct config browser:development by default', () => {
    console.log(colorize.orange('Asserting configs...'))
    expect(JSON.parse(getConfig())).toMatchSnapshot()
  })

  it('should have the correct config browser:development by default handling --debug mode', () => {
    process.env[CTS.DEBUG] = 'true'
    expect(JSON.parse(getConfig())).toMatchSnapshot()
  })

  it('should handle correctly the config browser:development', () => {
    const appConfigFromParams = getConfig({
      mode: 'development',
      target: 'browser'
    })
    process.env.NODE_ENV = 'browser:development'
    const appConfigFromEnv = getConfig()
    expect(appConfigFromParams).toEqual(appConfigFromEnv)
    expect(JSON.parse(appConfigFromParams)).toMatchSnapshot()
  })

  it('should handle correctly the config browser:production', () => {
    const appConfigFromParams = getConfig({
      mode: 'production',
      target: 'browser'
    })
    process.env.NODE_ENV = 'browser:production'
    const appConfigFromEnv = getConfig()
    expect(appConfigFromParams).toEqual(appConfigFromEnv)
    expect(JSON.parse(appConfigFromParams)).toMatchSnapshot()
  })

  it('should handle correctly the config mobile:development', () => {
    const appConfigFromParams = getConfig({
      mode: 'development',
      target: 'mobile'
    })
    process.env.NODE_ENV = 'mobile:development'
    const appConfigFromEnv = getConfig()
    expect(appConfigFromParams).toEqual(appConfigFromEnv)
    expect(JSON.parse(appConfigFromParams)).toMatchSnapshot()
  })

  it('should handle correctly the config mobile:production', () => {
    const appConfigFromParams = getConfig({
      mode: 'production',
      target: 'mobile'
    })
    process.env.NODE_ENV = 'mobile:production'
    const appConfigFromEnv = getConfig()
    expect(appConfigFromParams).toEqual(appConfigFromEnv)
    expect(JSON.parse(appConfigFromParams)).toMatchSnapshot()
  })

  it('should use custom app.config.js from the app root if exists', () => {
    const tempConfigPath = path.join(appPath, 'app.config.js')
    fs.copySync(ownTestConfig, tempConfigPath)
    expect(JSON.parse(getConfig())).toMatchSnapshot()
    fs.removeSync(tempConfigPath)
  })

  it('should use the custom config path if exists as environment variable', () => {
    const tempConfigPath = path.join(appPath, './src/custom.config.js')
    fs.copySync(ownTestConfig, tempConfigPath)
    process.env[CTS.CONFIG] = 'src/custom.config.js'
    expect(JSON.parse(getConfig())).toMatchSnapshot()
    fs.removeSync(tempConfigPath)
  })

  // Generated app tests
  it('should pass all app tests and lint with success', () => {
    console.log(colorize.orange('Running app tests...'))
    expect(() => {
      const lintProcess = spawn.sync('yarn', ['lint'], { stdio: 'inherit' })
      if (lintProcess.status !== 0)
        throw new Error('Created application linting failed.')
      const testProcess = spawn.sync(
        'yarn',
        ['test', '--verbose', '--coverage'],
        { stdio: 'inherit' }
      )
      if (testProcess.status !== 0)
        throw new Error('Test from application created failed.')
    }).not.toThrow()
  })

  // the --help option should always be a working option of the publish CLI
  it('should work correctly with publish --help option', () => {
    console.log(colorize.orange('Running publish --help...'))
    const publishScript = require(path.join(
      appPath,
      'node_modules',
      'cozy-scripts',
      'scripts',
      'publish.js'
    ))
    expect(() => {
      publishScript({
        cliArgs: ['--help']
      })
    }).not.toThrow()
  })

  // the --help option should always be a working option of the release CLI
  it('should work correctly with release --help option', () => {
    console.log(colorize.orange('Running release --help...'))
    const releaseScript = require(path.join(
      appPath,
      'node_modules',
      'cozy-scripts',
      'scripts',
      'release.js'
    ))
    expect(() => {
      releaseScript({
        cliArgs: ['--help']
      })
    }).not.toThrow()
  })

  it('should run webpack.run correctly with build script', done => {
    console.log(colorize.orange('Testing cozy-scripts build script...'))
    // should be NODE_ENV = 'browser:production' by default here
    const build = require(path.join(
      appPath,
      'node_modules',
      'cozy-scripts',
      'scripts',
      'build.js'
    ))
    expect(() => build({ useVue: true }, done)).not.toThrow()
    expect(process.env.NODE_ENV).toBe('browser:production')
  })

  // should be always at the end (due to cleanUp usage)
  it('should run webpack.watch correctly with watch script', done => {
    console.log(colorize.orange('Testing cozy-scripts watch script...'))
    // should be NODE_ENV = 'browser:development' by default here
    const watch = require(path.join(
      appPath,
      'node_modules',
      'cozy-scripts',
      'scripts',
      'watch.js'
    ))
    expect(() =>
      watch({ useVue: true }, multiWatching => {
        multiWatching.close(() => {
          let isClosed = true
          for (const watching of multiWatching.watchings) {
            isClosed = isClosed && watching.closed
          }
          if (isClosed) {
            console.log(colorize.orange('Watch script closed correctly.'))
          } else {
            cleanUp()
            throw new Error(
              colorize.red(
                'The watch script may not have been closed correctly'
              )
            )
          }
          done()
        })
      })
    ).not.toThrow()
    expect(process.env.NODE_ENV).toBe('browser:development')
  })
})
