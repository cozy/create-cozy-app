'use strict'

const CopyPlugin = require('copy-webpack-plugin')

const { environment, hasPublic, publicFolderName } = require('./webpack.vars')
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

// Method to modify the manifest:
//
// For production, we grab informations from the locales: short_description,
// long_description, name, changes... ('manifest' field in the local file)
// It also computes the langs array according to the existing locales files
function transformManifest(buffer) {
  const content = JSON.parse(buffer.toString())
  if (environment === 'production') {
    const locales = fs.readdirSync(paths.appLocales())
    content.locales = {}
    content.langs = []
    for (const idx in locales) {
      const localContent = require(path.join(paths.appLocales(), locales[idx]))
      const lang = locales[idx].match(/^([^.]*).json$/)[1]
      content.locales[lang] = localContent.manifest ? localContent.manifest : {}
      content.langs.push(lang)
    }
  }
  // icon will be stored in public folder for app with public page
  if (
    hasPublic &&
    content.icon &&
    !content.icon.match(new RegExp(`${publicFolderName}/`))
  ) {
    content.icon = path.join(publicFolderName, content.icon)
  }
  return JSON.stringify(content, null, '  ')
}
