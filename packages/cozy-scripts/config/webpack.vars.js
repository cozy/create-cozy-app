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
const production = environment === 'production'

console.log(
  colorize.cyan(
    `Compiling for ${colorize.orange.bold(
      environment
    )} environment and ${colorize.orange.bold(target)} target...`
  )
)

const isDebugMode = process.env[CTS.DEBUG] === 'true'
const addAnalyzer = process.env[CTS.ANALYZER] === 'true'
const addCozyBarV7 = process.env[CTS.BAR_V7] === 'true'

const useHotReload =
  process.env[CTS.HOT] === 'true' && environment === 'development'
const eslintFix = process.env[CTS.ESLINT_FIX] === 'true'
const devtool =
  process.env[CTS.DEVTOOL] === 'false' ? false : process.env[CTS.DEVTOOL]
const publicFolderName = 'public'
const intentsFolderName = 'intents'
const useCozyClientJs = process.env[CTS.COZY_CLIENT_JS] === 'true'

const getCSSLoader = function() {
  return useHotReload
    ? require.resolve('style-loader')
    : MiniCssExtractPlugin.loader
}

/**
 * Make filename with path without extension
 *
 * @param  {boolean} [enableProductionHash=true] - Add hash to filename
 * @returns {string} filename with path without extension
 */
const makeFilename = function(enableProductionHash = true) {
  return environment === 'production' && enableProductionHash
    ? `[name]/${manifest.slug}.[contenthash]`
    : `[name]/${manifest.slug}`
}

/**
 * Make filename with path & extension.
 * Replace the "/" by "-" for all chunkName !== "public",
 * in order to have the files at the root of the build
 *
 * @param {string} chunkName - (public, vendors, etc)
 * @returns {string} Filename with extension
 */
const makeCSSFilename = chunkName => {
  return chunkName === publicFolderName
    ? `${makeFilename()}${production ? '.min' : ''}.css`
    : `${makeFilename().replace(/\//g, '-')}${production ? '.min' : ''}.css`
}
/**
 * Make chunk filename
 *
 * @returns {string} Filename with path without extension
 */
const makeCSSChunkFilename = () => {
  return `${makeFilename().replace(/\//g, '-')}${
    production ? '.[id].min' : ''
  }.css`
}

const getEnabledFlags = function() {
  if (typeof process.env.COZY_FLAGS !== 'string') {
    return []
  }

  return process.env.COZY_FLAGS.split(',')
}

const getReactExposer = () => paths.csReactExposer()

const shouldAddPublicConfig = () =>
  process.env[CTS.FORCE_PUBLIC] == 'true' ||
  (target === 'browser' &&
    fs.existsSync(paths.appPublicIndex()) &&
    fs.existsSync(paths.appPublicHtmlTemplate()))

module.exports = {
  addAnalyzer,
  addCozyBarV7,
  environment,
  eslintFix,
  getEnabledFlags,
  makeFilename,
  makeCSSFilename,
  makeCSSChunkFilename,
  getCSSLoader,
  isDebugMode,
  target,
  useHotReload,
  useCozyClientJs,
  publicFolderName,
  intentsFolderName,
  getReactExposer,
  shouldAddPublicConfig,
  devtool
}
