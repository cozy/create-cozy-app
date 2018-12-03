'use strict'

const colorize = require('../utils/_colorize')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const fs = require('fs-extra')
const paths = require('../utils/paths')
const CTS = require('../utils/constants.js')
const manifest = fs.readJsonSync(paths.appManifest())

// default NODE_ENV to browser development
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'browser:development'

const target = process.env.NODE_ENV.match(/^(\w+):/)[1]
const environment = process.env.NODE_ENV.match(/^\w+:(\w+)$/)[1]

console.log(
  colorize.cyan(
    `Compiling for ${colorize.orange.bold(
      environment
    )} environment and ${colorize.orange.bold(target)} target...`
  )
)

const isDebugMode = process.env[CTS.DEBUG] === 'true'
const addAnalyzer = process.env[CTS.ANALYZER] === 'true'
const useHotReload = process.env[CTS.HOT] === 'true'
const eslintFix = process.env[CTS.ESLINT_FIX] === 'true'

const getCSSLoader = function() {
  return useHotReload
    ? require.resolve('style-loader')
    : MiniCssExtractPlugin.loader
}

const getFilename = function() {
  return environment === 'production'
    ? `${manifest.slug}.[name].[contenthash]`
    : `${manifest.slug}.[name]`
}

let cozyUIMajorVersion
try {
  const cozyUIPackageJson = fs.readJsonSync(paths.appCozyUiPackageJson())
  cozyUIMajorVersion = cozyUIPackageJson.version.split('.')[0]
} catch (e) {
  cozyUIMajorVersion = '1' // default version
}

const getAppPreEntries = () => {
  const preEntries = [
    // polyfills, avoid to import it in the application
    require.resolve('babel-polyfill'),
    // Exposed variables in global scope (needed for cozy-bar)
    process.env[CTS.USE_PREACT]
      ? paths.csPreactExposer()
      : paths.csReactExposer()
  ]
  // transpiled cozy-ui stylesheet if transpiled components used
  if (cozyUIMajorVersion >= 15) {
    preEntries.push(paths.appCozyUiTranspiledCss())
  }
  return preEntries
}

module.exports = {
  addAnalyzer,
  cozyUIMajorVersion,
  environment,
  eslintFix,
  getFilename,
  getCSSLoader,
  isDebugMode,
  getAppPreEntries,
  target,
  useHotReload
}
