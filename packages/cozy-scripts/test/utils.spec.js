/* eslint-env jest */

const fs = require('fs')
const paths = require('../utils/paths')

describe('Paths provider helper', () => {
  beforeEach(() => {
    delete process.env.__ENTRY_EXT__
    delete process.env.COZY_SCRIPTS_APP_SRC_DIR
    delete process.env.COZY_SCRIPTS_APP_BUILD_DIR
    delete process.env.COZY_SCRIPTS_APP_MANIFEST
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
    ['__ENTRY_EXT__', '.vue'],
    ['COZY_SCRIPTS_APP_SRC_DIR', 'subfolder/src/myapp'],
    ['COZY_SCRIPTS_APP_BUILD_DIR', 'subfolder/build/myapp'],
    ['COZY_SCRIPTS_APP_MANIFEST', 'subfolder/src/myapp/manifest.webapp']
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
