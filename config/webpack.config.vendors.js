'use strict'

const CopyPlugin = require('copy-webpack-plugin')
const SvgoInstance = require('svgo')
const paths = require('../utils/paths')
const fs = require('fs')

const svgo = new SvgoInstance({
  plugins: [
    {
      removeDimensions: true,
      // inline styles are blocked by Cozy CSPs
      inlineStyles: {
        onlyMatchedOnce: false
      },
      removeViewBox: false
    }
  ]
})

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
    return svgo.optimize(buffer).then(resp => resp.data)
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
