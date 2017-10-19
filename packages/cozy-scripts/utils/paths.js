'use strict'

const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
// const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)

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
  appBrowserIndexJsx: resolveApp('src/targets/browser/index.jsx'),
  // for services
  appServicesHtmlTemplate: resolveApp('src/targets/services/index.ejs'),
  appServicesIndexJsx: resolveApp('src/targets/services/index.jsx'),
  // for mobile
  appMobileHtmlTemplate: resolveApp('src/targets/mobile/index.ejs'),
  appMobileIndexJsx: resolveApp('src/targets/mobile/index.jsx'),
  appMobileWWW: resolveApp('src/targets/mobile/www'),
  // for app local cozy-bar (dev only)
  appCozyBarJs: resolveApp('node_modules/cozy-bar/dist/cozy-bar.js'),
  appCozyBarCss: resolveApp('node_modules/cozy-bar/dist/cozy-bar.css'),
  // cozy-ui
  appCozyUiStylus: resolveApp('node_modules/cozy-ui/stylus')
}
