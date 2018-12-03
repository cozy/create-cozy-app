/* eslint-env jest */

const path = require('path')
// to remove chalk colors escape codes and handling all testing environments
const stripAnsi = require('strip-ansi')
const CTS = require('../utils/constants.js')

const actualArgv = process.argv.slice(0) // a clone
const actualLog = console.log
const actualError = console.error
let currentScriptFile = null

// mocking
;['build', 'watch', 'start'].map(name => {
  jest.doMock(`../scripts/${name}`, () =>
    jest.fn(options => {
      currentScriptFile = name
      expect(options).toMatchSnapshot()
    })
  )
})
;['publish', 'release'].map(name => {
  jest.doMock(`../scripts/${name}`, () =>
    jest.fn(options => {
      const { cliArgs } = options
      currentScriptFile = name
      expect(`cozy-${name} ${cliArgs.join(' ')}`).toMatchSnapshot()
    })
  )
})

jest.doMock('../scripts/config', () =>
  jest.fn(options => {
    expect(options).toMatchSnapshot()
    return {
      config: 'Mocked config'
    }
  })
)

jest.doMock('../scripts/lint', () =>
  jest.fn(options => {
    const { cliArgs } = options
    currentScriptFile = 'lint'
    expect(`eslint ${cliArgs.join(' ')}`).toMatchSnapshot()
  })
)

jest.doMock('jest', () => ({
  run: jest.fn(args => {
    currentScriptFile = 'test'
    expect(`jest ${args.join(' ')}`).toMatchSnapshot()
  })
}))

// we reproduce the process.argv passed by node
// see https://nodejs.org/docs/latest/api/process.html#process_process_argv
function addCLIArgs(...args) {
  process.argv = process.argv.concat(args)
}

function callCLI() {
  jest.resetModules() // force doing require each time
  require('../bin/cozy-scripts')
}

describe('cozy-scripts (cs) CLI', () => {
  beforeEach(() => {
    jest.resetAllMocks()
    console.log = actualLog
    console.error = actualError
    currentScriptFile = null
    // clean args list
    process.argv = [process.execPath, path.resolve('../bin/cozy-scripts')]
    // default env
    delete process.env[CTS.HOT]
    delete process.env[CTS.DEBUG]
    delete process.env[CTS.ANALYZER]
    delete process.env[CTS.ESLINT_FIX]
    delete process.env[CTS.SRC_DIR]
    delete process.env[CTS.BUILD_DIR]
    delete process.env[CTS.MANIFEST]
  })

  afterAll(() => {
    // reset the argv environment variable
    process.argv = actualArgv.slice(0)
  })

  it('should display an help message if no args passed', () => {
    console.error = jest.fn()
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(stripAnsi(console.error.mock.calls[0][0])).toMatchSnapshot()
  })

  it('should display an error message if the action/command is not recognize', () => {
    console.error = jest.fn()
    // add cli arguments
    addCLIArgs('nobodyKnowIt', '--watch')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(stripAnsi(console.error.mock.calls[0][0])).toMatchSnapshot()
  })

  it('should display the webpack config if option `--show-config` passed', () => {
    console.log = jest.fn()
    addCLIArgs('build', '--browser', '--show-config')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(stripAnsi(console.log.mock.calls[0][0])).toMatchSnapshot()
  })

  it('should handle previous `standalone` command to display a message to use `start` instead', () => {
    console.log = jest.fn()
    console.error = jest.fn() // mute this log channel
    addCLIArgs('standalone', '--browser')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(stripAnsi(console.log.mock.calls.join(' '))).toMatchSnapshot()
  })

  it('should call jest on `test` command and pass remaining args to jest', () => {
    // add cli arguments
    addCLIArgs('test', '--watch', '--runInBand', '--config', 'undefile.js')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(currentScriptFile).toBe('test')
  })

  it('should call eslint on `lint` command and pass remaining args to eslint', () => {
    // add cli arguments
    addCLIArgs('lint', '--fix', '{src,test}/**/*.{js,jsx}')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(currentScriptFile).toBe('lint')
  })

  it('should call cozy-release on `release` command and pass remaining args to cozy-release', () => {
    // add cli arguments
    addCLIArgs('release', 'patch', '1.2.4')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(currentScriptFile).toBe('release')
  })

  it('should call cozy-publish on `publish` command and pass remaining args to cozy-publish', () => {
    // add cli arguments
    addCLIArgs('publish', '--token', 'aMockedReGIStrYToKeN')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(currentScriptFile).toBe('publish')
  })

  it('should build on `build` command with all passed options with production mode by default', () => {
    // add cli arguments
    addCLIArgs('build', '--browser')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(currentScriptFile).toBe('build')
  })

  it('should watch on `watch` command with all passed options with development mode by default', () => {
    // add cli arguments
    addCLIArgs('watch', '--browser')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(currentScriptFile).toBe('watch')
  })

  it('should handle --analyzer option', () => {
    // add cli arguments
    addCLIArgs('watch', '--browser', '--analyzer')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(process.env[CTS.ANALYZER]).toBe('true')
  })

  it('should handle debug mode with --debug option', () => {
    // add cli arguments
    addCLIArgs('watch', '--debug')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(process.env[CTS.DEBUG]).toBe('true')
  })

  it('should handle eslint fix mode with --fix option', () => {
    // add cli arguments
    addCLIArgs('lint', '--fix')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(process.env[CTS.ESLINT_FIX]).toBe('true')
  })

  it('should handle hot reload mode with --hot option', () => {
    // add cli arguments
    addCLIArgs('watch', '--hot')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(process.env[CTS.HOT]).toBe('true')
  })

  it('should handle src directory path providing with --src-dir option', () => {
    // add cli arguments
    const customPath = 'custom/app/src'
    addCLIArgs('watch', '--src-dir', customPath)
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(process.env[CTS.SRC_DIR]).toBe(customPath)
  })

  it('should handle build directory path providing with --build-dir option', () => {
    // add cli arguments
    const customPath = 'custom/app/buildHere'
    addCLIArgs('watch', '--build-dir', 'custom/app/buildHere')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(process.env[CTS.BUILD_DIR]).toBe(customPath)
  })

  it('should handle manifest path providing with --manifest option', () => {
    // add cli arguments
    const customPath = 'custom/app/manifest.webapp'
    addCLIArgs('watch', '--manifest', 'custom/app/manifest.webapp')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(process.env[CTS.MANIFEST]).toBe(customPath)
  })

  it('should handle --production option', () => {
    // add cli arguments
    addCLIArgs('watch', '--browser', '--production')
    expect(() => {
      callCLI()
    }).not.toThrow()
  })

  it('should handle --development option', () => {
    // add cli arguments
    addCLIArgs('watch', '--browser', '--development')
    expect(() => {
      callCLI()
    }).not.toThrow()
  })

  it('should vue framework with --vue option', () => {
    // add cli arguments
    addCLIArgs('watch', '--vue')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(process.env[CTS.USE_VUE]).toBe('true')
  })

  it('should handle mobile target with --mobile option', () => {
    // add cli arguments
    addCLIArgs('watch', '--mobile')
    expect(() => {
      callCLI()
    }).not.toThrow()
  })

  it('should run start script on `start` command with all passed options with development mode by default', () => {
    // add cli arguments
    addCLIArgs('start', '--no-stack')
    expect(() => {
      callCLI()
    }).not.toThrow()
    expect(currentScriptFile).toBe('start')
  })
})
