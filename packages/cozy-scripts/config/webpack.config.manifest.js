'use strict'

const CopyPlugin = require('copy-webpack-plugin')

const {production} = require('./webpack.vars')
const paths = require('../utils/paths')
const path = require('path')
const fs = require('fs')

module.exports = {
  plugins: [
    new CopyPlugin([
      { from: paths.appManifest, transform: transformManifest },
      { from: paths.appREADME },
      { from: paths.appLICENSE }
    ])
  ]
}

// Method to modify the manifest:
//
// For dev builds we use the generic "app" slug to share the same application
// domain for each applications.
//
// For production, we grab informations from the locales: short_description,
// long_description, name, changes... ('manifest' field in the local file)
// It also computes the langs array according to the existing locales files
function transformManifest (buffer) {
  const content = JSON.parse(buffer.toString())
  if (production) {
    const locales = fs.readdirSync(paths.appLocales)
    content.locales = {}
    content.langs = []
    for (const idx in locales) {
      const localContent = require(path.join(paths.appLocales, locales[idx]))
      const lang = locales[idx].match(/^([^.]*).json$/)[1]
      content.locales[lang] = localContent.manifest ? localContent.manifest : {}
      content.langs.push(lang)
    }
  } else {
    content.slug = 'app'
  }
  return JSON.stringify(content, null, '  ')
}
