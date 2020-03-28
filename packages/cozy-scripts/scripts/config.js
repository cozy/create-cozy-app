'use strict'

const merge = require('webpack-merge')
const path = require('path')
const fs = require('fs-extra')
const CTS = require('../utils/constants.js')
const { mergeWithOptions, mergeAppConfigs } = require('../utils/merge')

function getWebpackConfigs(options = {}) {
  // mode and target options should already be provided
  const { mode = 'development', target = 'browser' } = options

  // NODE_ENV from environment overwrite options here
  if (!process.env.NODE_ENV) process.env.NODE_ENV = `${target}:${mode}`

  // check if a custom config exists in the app source
  let appConfigs
  const configPath = path.join(
    process.cwd(),
    process.env[CTS.CONFIG] || 'app.config.js'
  )
  if (fs.existsSync(configPath)) {
    appConfigs = require(configPath)
  } else {
    appConfigs = [require('../config/webpack.bundle.default.js')]
  }

  const mergedConfig = mergeAppConfigs(appConfigs)

  // the first position will always be the main app config
  // better for testing
  const configs = [{}]

  // configurations if multi-compiling
  if (mergedConfig.multiple) {
    for (const config in mergedConfig.multiple) {
      const configPart = Object.assign({}, mergedConfig.multiple[config])
      delete mergedConfig.multiple[config]
      let separateConfig = {}
      if (configPart.__mergeStrategy) {
        // if merge strategy found
        const options = Object.assign({}, configPart.__mergeStrategy)
        delete configPart.__mergeStrategy
        separateConfig = mergeWithOptions(options, [mergedConfig], configPart)
      } else {
        separateConfig = merge(mergedConfig, configPart)
      }
      if (separateConfig.multiple) delete separateConfig.multiple
      configs.push(separateConfig)
    }
    delete mergedConfig.multiple
  }

  // replace the first position placeholder in the list
  configs[0] = mergedConfig

  return merge.multiple(configs)
}

module.exports = getWebpackConfigs
