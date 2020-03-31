const path = require('path')
const fs = require('fs')
const getWebpackConfigs = require('../scripts/config.js')
const CTS = require('../utils/constants.js')

const APP_PATH = fs.realpathSync(path.join(__dirname, '../template'))

const APP_NODE_MODULES = fs.realpathSync(
  path.join(__dirname, '../../../node_modules')
)

function getConfig(options) {
  let appConfig = getWebpackConfigs(options)

  // we replace path to avoid environment specific snapshots
  // ex: paths like `/me/test/${testFolder}/...` will be `${testFolder}/...`
  const replacements = [
    ['packages/cozy-scripts/template/', ''],
    ['packages/cozy-scripts', 'node_modules/cozy-scripts'],
    ['<APP_SLUG>', 'test-app'],
    ['<APP_NAME>', 'test-app'],
    [process.cwd(), '.tmp_test/test-app']
  ]

  let json = JSON.stringify(appConfig, null, 2)

  for (let [src, dest] of replacements) {
    json = json.replace(new RegExp(src, 'g'), dest)
  }

  return json
}

beforeEach(() => {
  process.env[CTS.APP_PATH] = APP_PATH
  process.env[CTS.APP_NODE_MODULES] = APP_NODE_MODULES
  // reset NODE_ENV
  if (process.env.NODE_ENV) delete process.env.NODE_ENV
  if (process.env[CTS.DEBUG]) delete process.env[CTS.DEBUG]
  if (process.env[CTS.CONFIG]) delete process.env[CTS.CONFIG]
  jest.resetModules()
})

describe('App from cozy-scripts', () => {
  it('should have the correct config browser:development by default', () => {
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

  describe('public', () => {
    beforeEach(() => {
      process.env[CTS.FORCE_PUBLIC] = 'true'
    })

    afterEach(() => {
      delete process.env[CTS.FORCE_PUBLIC]
    })

    it('should handle correctly the config browser:production with public files', () => {
      const appConfigFromParams = getConfig({
        mode: 'production',
        target: 'browser'
      })
      process.env.NODE_ENV = 'browser:production'
      const appConfigFromEnv = getConfig()
      expect(appConfigFromParams).toEqual(appConfigFromEnv)
      expect(JSON.parse(appConfigFromParams)).toMatchSnapshot()
    })
  })
})
