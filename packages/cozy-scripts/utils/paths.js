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
  appAppJsx: resolveApp('src/App.jsx'),
  appHtmlTemplate: resolveApp('src/index.ejs'),
  appIndexJsx: resolveApp('src/index.jsx'),
  appServicesHtmlTemplate: resolveApp('src/services.ejs'),
  appServicesIndexJsx: resolveApp('src/services.jsx'),
  appPackageJson: resolveApp('package.json'),
  appManifest: resolveApp('manifest.webapp'),
  appREADME: resolveApp('README.md'),
  appLICENSE: resolveApp('LICENSE'),
  appSrc: resolveApp('src'),
  appVendorAssets: resolveApp('vendor/assets'),
  appYarnLockFile: resolveApp('yarn.lock'),
  appNodeModules: resolveApp('node_modules'),
  // for mobile
  appMobileSrc: resolveApp('mobile/src'),
  appMobileMain: resolveApp('mobile/src/main'),
  appMobileWWW: resolveApp('mobile/www'),
  // for app local cozy-bar (dev only)
  appCozyBarJs: resolveApp('node_modules/cozy-bar/dist/cozy-bar.js'),
  appCozyBarCss: resolveApp('node_modules/cozy-bar/dist/cozy-bar.css'),
  // cozy-ui
  appCozyUiStylus: resolveApp('node_modules/cozy-ui/stylus')
}
