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
  appConfigs = [require(path.join('../config/webpack.bundle.default.js'))]
}

const mergedConfig = merge(appConfigs)

// the first position will always be the main app config
// better for testing
const configs = [{}]

// configurations if multi-compiling
if (mergedConfig.multiple) {
  for (const config in mergedConfig.multiple) {
    const configPart = Object.assign(
      {}, mergedConfig.multiple[config]
    )
    delete mergedConfig.multiple[config]
    let mergeStrategy = {}
    if (configPart.mergeStrategy) {
      mergeStrategy = Object.assign({}, configPart.mergeStrategy)
      delete configPart.mergeStrategy
    }
    configs.push(merge.strategy(mergeStrategy)(mergedConfig, configPart))
  }
  delete mergedConfig.multiple
}

// replace the first position placeholder in the list
configs[0] = mergedConfig

module.exports = merge.multiple(configs)
