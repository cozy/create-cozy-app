'use strict'

const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)

// This must be used inside a function (called when needed)
// to be sure to use the current process.env context
// and not the one at the first loading of this file
const resolveWithExtension = (path, extension) => {
  const ext = extension || process.env.__ENTRY_EXT__ || '.js'
  return resolveApp(`${path}${ext}`)
}

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveApp('build'),
  appServicesBuild: resolveApp('build/services'),
  appBuildAssetsJson: resolveApp('build/assets/json'),
  appPackageJson: resolveApp('package.json'),
  appManifest: resolveApp('manifest.webapp'),
  appREADME: resolveApp('README.md'),
  appLICENSE: resolveApp('LICENSE'),
  appSrc: resolveApp('src'),
  appLocales: resolveApp('src/locales'),
  appVendorAssets: resolveApp('src/targets/vendor/assets'),
  appNodeModules: resolveApp('node_modules'),
  // for tests
  jestConfig: resolveApp('jest.config.js'),
  // for browser
  appBrowserHtmlTemplate: resolveApp('src/targets/browser/index.ejs'),
  appBrowserIndex: ext =>
    resolveWithExtension('src/targets/browser/index', ext),
  // for intents
  appIntentsHtmlTemplate: resolveApp('src/targets/intents/index.ejs'),
  appIntentsIndex: ext =>
    resolveWithExtension('src/targets/intents/index', ext),
  // for services
  appServicesFolder: resolveApp('src/targets/services'),
  // for mobile
  appMobileHtmlTemplate: resolveApp('src/targets/mobile/index.ejs'),
  appMobileIndex: ext => resolveWithExtension('src/targets/mobile/index', ext),
  appMobileWWW: resolveApp('src/targets/mobile/www'),
  // for app local cozy-bar (dev only)
  appCozyBarJs: resolveApp('node_modules/cozy-bar/dist/cozy-bar.js'),
  appCozyBarCss: resolveApp('node_modules/cozy-bar/dist/cozy-bar.css'),
  // cozy-ui
  appCozyUiStylus: resolveApp('node_modules/cozy-ui/stylus'),

  // for cozy-scripts
  csDisableCSPConfig: resolveOwn('stack/disableCSP.yaml'),
  csEslintBinary: resolveOwn('node_modules/.bin/eslint'),
  csExposer: resolveOwn('utils/exposer.js'),
  csQuitStackScript: resolveOwn('stack/quitStack.sh')
}
