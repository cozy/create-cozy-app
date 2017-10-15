'use strict'

const CopyPlugin = require('copy-webpack-plugin')
const paths = require('../utils/paths')

module.exports = {
  plugins: [
    new CopyPlugin([
      { from: paths.appVendorAssets, ignore: ['.gitkeep'] }
    ])
  ]
}
