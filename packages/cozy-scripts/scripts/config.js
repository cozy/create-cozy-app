'use strict'

const merge = require('webpack-merge')
const path = require('path')
const fs = require('fs-extra')

// check if a custom config exists in the app source

let appConfigs
// app/node_modules/cozy-scripts/scripts
if (fs.existsSync(path.join(process.cwd(), 'app.config.js'))) {
  appConfigs = require(path.join(process.cwd(), 'app.config.js'))
} else {
  appConfigs = require(path.join('../config/webpack.bundle.default.js'))
}

module.exports = merge.apply(null, appConfigs)
