/* eslint-env jest */

const fs = require('fs')
const paths = require('../utils/paths')
const CTS = require('../utils/constants.js')

describe('Paths provider helper', () => {
  beforeEach(() => {
    delete process.env[CTS.ENTRY_EXT]
    delete process.env[CTS.SRC_DIR]
    delete process.env[CTS.BUILD_DIR]
    delete process.env[CTS.MANIFEST]
  })

  // the app path will always be the same here
  const replaceAppPath = path =>
    path.replace(fs.realpathSync(process.cwd()), '/Custom/Path/To/App')

  it('should provide all default paths', () => {
    const pathsList = []
    for (let getter in paths) {
      if (paths.hasOwnProperty(getter)) {
        pathsList.push(replaceAppPath(paths[getter]()))
      }
    }
    expect(pathsList).toMatchSnapshot()
  })

  //environment variables handling for options
  ;[
    [CTS.ENTRY_EXT, '.vue'],
    [CTS.SRC_DIR, 'subfolder/src/myapp'],
    [CTS.BUILD_DIR, 'subfolder/build/myapp'],
    [CTS.MANIFEST, 'subfolder/src/myapp/manifest.webapp']
  ].map(params => {
    it(`should provide all paths with custom ${params[0]}`, () => {
      process.env[params[0]] = params[1]
      const pathsList = []
      for (let getter in paths) {
        if (paths.hasOwnProperty(getter)) {
          pathsList.push(replaceAppPath(paths[getter]()))
        }
      }
      expect(pathsList).toMatchSnapshot()
    })
  })
})
