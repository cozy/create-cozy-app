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
function transformManifest(buffer) {
  const content = JSON.parse(buffer.toString())
  if (environment === 'production') {
    const locales = fs.readdirSync(paths.appLocales)
    content.locales = {}
    content.langs = []
    for (const idx in locales) {
      const localContent = require(path.join(paths.appLocales, locales[idx]))
      const lang = locales[idx].match(/^([^.]*).json$/)[1]
      content.locales[lang] = localContent.manifest ? localContent.manifest : {}
      content.langs.push(lang)
    }

    const manifestLocalesFileRegexp = /^manifest\.[a-zA-Z_-]{2,}.json$/
    const manifestLocales =
      fs
        .readdirSync(paths.appPath)
        .filter(file => manifestLocalesFileRegexp.test(file))
    manifestLocales.forEach(file => {
      const fileContent = require(path.join(paths.appPath, file))
      const lang = file.match(manifestLocalesFileRegexp)
      // Override existing locale data
      content.locales[lang] = fileContent
      if (!content.langs.includes(lang)) content.langs.push(lang)
    })

  } else {
    content.slug = 'app'
  }
  return JSON.stringify(content, null, '  ')
}
