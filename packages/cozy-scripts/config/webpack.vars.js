'use strict'

const colorize = require('../utils/_colorize')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const fs = require('fs-extra')
const paths = require('../utils/paths')
const CTS = require('../utils/constants.js')
const manifest = fs.readJsonSync(paths.appManifest())
const pkg = fs.readJsonSync(paths.appPackage())

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
const useClientJS =
  !!(pkg.dependencies && pkg.dependencies['cozy-client-js']) ||
  !!(pkg.devDependencies && pkg.devDependencies['cozy-client-js'])

const hasPublic = () =>
  fs.existsSync(paths.appPublicIndex()) &&
  fs.existsSync(paths.appPublicHtmlTemplate())

const publicFolderName = 'public'

const assetsFolderName = 'assets'

const getCSSLoader = function() {
  return useHotReload
    ? require.resolve('style-loader')
    : MiniCssExtractPlugin.loader
}

const getFilename = function(enableProductionHash = true) {
  return environment === 'production' && enableProductionHash
    ? `[name]/${manifest.slug}.[contenthash]`
    : `[name]/${manifest.slug}`
}

const getEnabledFlags = function() {
  if (typeof process.env.COZY_FLAGS !== 'string') {
    return []
  }

  return process.env.COZY_FLAGS.split(',')
}

const getReactExposer = function() {
  return process.env[CTS.USE_PREACT]
    ? paths.csPreactExposer()
    : paths.csReactExposer()
}

module.exports = {
  addAnalyzer,
  assetsFolderName,
  environment,
  eslintFix,
  getEnabledFlags,
  getFilename,
  getCSSLoader,
  hasPublic,
  isDebugMode,
  target,
  useHotReload,
  useClientJS,
  publicFolderName,
  getReactExposer
}
