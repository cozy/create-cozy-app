'use strict'

const CopyPlugin = require('copy-webpack-plugin')

const { environment } = require('./webpack.vars')
const paths = require('../utils/paths')
const path = require('path')
const fs = require('fs')

module.exports = {
  module: {
    rules: [
      {
        test: /\.webapp$/,
        exclude: /node_modules/,
        loader: require.resolve('json-loader')
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: paths.appManifest(), transform: transformManifest },
      { from: paths.appREADME() },
      { from: paths.appLICENSE() }
    ])
  ]
}

/**
 * Merges content from locales JSON files into manifest
 * Bails out if either manifest.locales or manifest.lang is there
 * Only use locales from manifest.langs if is there
 */
const insertLocalesIntoManifest = manifest => {
  if (manifest.locales || manifest.lang) {
    return
  }
  const locales = fs.readdirSync(paths.appLocales())
  let localesContent = {}
  let langs = []
  for (const idx in locales) {
    const localContent = require(path.join(paths.appLocales(), locales[idx]))
    const lang = locales[idx].match(/^([^.]*).json$/)[1]
    localesContent[lang] = localContent.manifest ? localContent.manifest : {}
    langs.push(lang)
  }

  if (manifest.langs) {
    manifest.locales = Object.keys(localesContent)
      .filter(key => manifest.langs.includes(key))
      .reduce((obj, key) => {
        obj[key] = localesContent[key]
        return obj
      }, {})
  } else {
    manifest.locales = localesContent
    manifest.langs = langs
  }
}

// Method to modify the manifest:
//
// For dev builds we use the generic "app" slug to share the same application
// domain for each applications.
//
// For production, we grab informations from the locales: short_description,
// long_description, name, changes... ('manifest' field in the local file)
// It also computes the langs array according to the existing locales files
function transformManifest(buffer) {
  const content = JSON.parse(buffer.toString())
  if (environment === 'production') {
    insertLocalesIntoManifest(content)
  } else {
    content.slug = 'app'
  }
  return JSON.stringify(content, null, '  ')
}
