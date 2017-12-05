'use strict'

const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
// const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)

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
  appBuildAssetsJson: resolveApp('build/assets/json'),
  appPackageJson: resolveApp('package.json'),
  appManifest: resolveApp('manifest.webapp'),
  appREADME: resolveApp('README.md'),
  appLICENSE: resolveApp('LICENSE'),
  appSrc: resolveApp('src'),
  appVendorAssets: resolveApp('src/targets/vendor/assets'),
  appNodeModules: resolveApp('node_modules'),
  // for browser
  appBrowserHtmlTemplate: resolveApp('src/targets/browser/index.ejs'),
  appBrowserIndex: (ext) => resolveWithExtension('src/targets/browser/index', ext),
  // for services
  appServicesHtmlTemplate: resolveApp('src/targets/services/index.ejs'),
  appServicesIndex: (ext) => resolveWithExtension('src/targets/services/index', ext),
  // for mobile
  appMobileHtmlTemplate: resolveApp('src/targets/mobile/index.ejs'),
  appMobileIndex: (ext) => resolveWithExtension('src/targets/mobile/index', ext),
  appMobileWWW: resolveApp('src/targets/mobile/www'),
  // for app local cozy-bar (dev only)
  appCozyBarJs: resolveApp('node_modules/cozy-bar/dist/cozy-bar.js'),
  appCozyBarCss: resolveApp('node_modules/cozy-bar/dist/cozy-bar.css'),
  // cozy-ui
  appCozyUiStylus: resolveApp('node_modules/cozy-ui/stylus')
}
