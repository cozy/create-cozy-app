'use strict'

const CopyPlugin = require('copy-webpack-plugin')

const {production} = require('./webpack.vars')
const paths = require('../utils/paths')

module.exports = {
  plugins: [
    new CopyPlugin([
      { from: paths.appManifest, transform: transformManifest },
      { from: paths.appREADME },
      { from: paths.appLICENSE }
    ])
  ]
}

// Method to modify the manifest slug on dev builds. On production builds the
// manifest should be copied without modification.
//
// For dev builds we use the generic "app" slug to share the same application
// domain for each applications.
function transformManifest (buffer) {
  if (production) { return buffer }

  const content = JSON.parse(buffer.toString())
  content.slug = 'app'
  return JSON.stringify(content, null, '  ')
}
