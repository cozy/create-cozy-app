'use strict'

const CopyPlugin = require('copy-webpack-plugin')
const { optimize } = require('svgo')
const paths = require('../utils/paths')
const fs = require('fs')

const svgoOptions = {
  plugins: [
    { name: 'removeDimensions', active: true },
    {
      name: 'inlineStyles',
      params: {
        onlyMatchedOnce: false
      }
    },
    {
      name: 'removeViewBox',
      active: false
    }
  ]
}

let iconName
try {
  iconName = JSON.parse(fs.readFileSync(paths.appManifest(), 'utf8')).icon
  // we run optimize only on SVG
  if (!iconName.match(/\.svg$/)) iconName = null
} catch (e) {
  console.error(`Unable to read the icon path from manifest: ${e}`)
}

function optimizeSVGIcon(buffer, path) {
  if (iconName && path.match(new RegExp(`[^/]*/${iconName}`))) {
    const result = optimize(buffer, svgoOptions)
    return result.data
  } else {
    return buffer
  }
}

module.exports = {
  plugins: [
    new CopyPlugin([
      { from: paths.appVendorAssets(), transform: optimizeSVGIcon }
    ])
  ]
}
