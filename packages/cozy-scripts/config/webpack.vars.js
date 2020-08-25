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
const useHotReload =
  process.env[CTS.HOT] === 'true' && environment === 'development'
const eslintFix = process.env[CTS.ESLINT_FIX] === 'true'
const devtool =
  process.env[CTS.DEVTOOL] === 'false' ? false : process.env[CTS.DEVTOOL]
const publicFolderName = 'public'

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

const getReactExposer = () => paths.csReactExposer()

module.exports = {
  addAnalyzer,
  environment,
  eslintFix,
  getEnabledFlags,
  getFilename,
  getCSSLoader,
  isDebugMode,
  target,
  useHotReload,
  publicFolderName,
  getReactExposer,
  devtool
}
