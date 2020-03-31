'use strict'

const path = require('path')
const fs = require('fs')
const CTS = require('../utils/constants.js')

const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath)
const appDirectory = () => {
  return fs.realpathSync(process.env[CTS.APP_PATH] || process.cwd())
}
const resolveApp = (relativePath = '.', fromDirectory) => {
  if (fromDirectory === undefined) {
    fromDirectory = appDirectory()
  }
  return path.resolve(fromDirectory, relativePath)
}

// Those must be used inside a function (called when needed)
// to be sure to use the current process.env context
// and not the one at the first loading of this file
const resolveAppSrc = (relativePath = '.') => {
  const appSrcDirectory = process.env[CTS.SRC_DIR] || 'src'
  return resolveApp(relativePath, resolveApp(appSrcDirectory))
}

const resolveSrcWithExtension = relativePath => {
  const ext = process.env[CTS.ENTRY_EXT] || '.js'
  return resolveAppSrc(`${relativePath}${ext}`)
}

const resolveAppBuild = (relativePath = '.') => {
  const appBuildDirectory = process.env[CTS.BUILD_DIR] || 'build'
  return resolveApp(relativePath, resolveApp(appBuildDirectory))
}

const resolveAppManifest = () => {
  const appManifest = process.env[CTS.MANIFEST] || 'manifest.webapp'
  return resolveApp(appManifest)
}

const resolveAppModule = modulePath => {
  const nodeModules =
    process.env[CTS.APP_NODE_MODULES] || resolveApp('node_modules')
  return path.resolve(nodeModules, modulePath)
}

// We use them as functions for all for more consistency
module.exports = {
  appPath: () => resolveApp(),
  appBuild: () => resolveAppBuild(),
  appServicesBuild: () => resolveAppBuild('services'),
  appBuildAssetsJson: () => resolveAppBuild('assets/json'),
  appManifest: () => resolveAppManifest(),
  appREADME: () => resolveApp('README.md'),
  appLICENSE: () => resolveApp('LICENSE'),
  appSrc: () => resolveAppSrc(),
  appLocales: () => resolveAppSrc('locales'),
  appVendorAssets: () => resolveAppSrc('targets/vendor/assets'),
  appNodeModules: () =>
    process.env[CTS.APP_NODE_MODULES] || resolveApp('node_modules'),
  // for browser
  appBrowserHtmlTemplate: () => resolveAppSrc('targets/browser/index.ejs'),
  appBrowserIndex: () => resolveSrcWithExtension('targets/browser/index'),
  // for intents
  appIntentsHtmlTemplate: () => resolveAppSrc('targets/intents/index.ejs'),
  appIntentsIndex: () => resolveSrcWithExtension('targets/intents/index'),
  // for public
  appPublicHtmlTemplate: () => resolveAppSrc('targets/public/index.ejs'),
  appPublicIndex: () => resolveSrcWithExtension('targets/public/index'),
  // for services
  appServicesFolder: () => resolveAppSrc('targets/services'),
  // for mobile
  appMobileHtmlTemplate: () => resolveAppSrc('targets/mobile/index.ejs'),
  appMobileIndex: () => resolveSrcWithExtension('targets/mobile/index'),
  appMobileWWW: () => resolveAppSrc('targets/mobile/www'),
  // for app local cozy-bar (dev only)
  appCozyBarJs: () => resolveAppModule('cozy-bar/dist/cozy-bar.js'),
  appCozyBarCss: () => resolveAppModule('cozy-bar/dist/cozy-bar.css'),
  appCozyClientJs: () => resolveAppModule('cozy-client-js/dist/cozy-client.js'),
  // cozy-ui
  appCozyUiStylus: () => resolveAppModule('cozy-ui/stylus'),

  // for cozy-scripts
  csDisableCSPConfig: () => resolveOwn('stack/disableCSP.yaml'),
  csEslintBinary: () => resolveOwn('node_modules/.bin/eslint'),
  csReactExposer: () => resolveOwn('utils/reactExposer.js'),
  csQuitStackScript: () => resolveOwn('stack/quitStack.sh')
}
