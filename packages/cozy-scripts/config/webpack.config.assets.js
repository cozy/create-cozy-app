'use strict'

const CopyPlugin = require('copy-webpack-plugin')
const SvgoInstance = require('svgo')
const path = require('path')
const { publicFolderName, hasPublic } = require('./webpack.vars')
const paths = require('../utils/paths')
const fs = require('fs-extra')
const manifest = fs.readJsonSync(paths.appManifest())

const svgo = new SvgoInstance({
  plugins: [
    {
      removeViewBox: false,
      removeDimensions: true,
      // inline styles are blocked by Cozy CSPs
      inlineStyles: {
        onlyMatchedOnce: false
      }
    }
  ]
})

const appIconPath = path.join(paths.appAssets(), manifest.icon)

module.exports = {
  plugins: [
    new CopyPlugin([
      {
        from: appIconPath,
        to: hasPublic
          ? path.join(paths.appBuild(), publicFolderName, manifest.icon)
          : path.join(paths.appBuild(), manifest.icon),
        transform: buffer => svgo.optimize(buffer).then(resp => resp.data)
      },
      {
        from: paths.appAssets(),
        ignore: [appIconPath]
      }
    ])
  ]
}
