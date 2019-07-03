'use strict'

const merge = require('webpack-merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const path = require('path')
const fs = require('fs-extra')
const CTS = require('../utils/constants.js')

const smp = new SpeedMeasurePlugin()

function mergeWithOptions(options, configs, current) {
  // merge with the previous configs using the provided strategy
  if (options.strategy) {
    return options.smart
      ? merge.smartStrategy(options.strategy)(...configs, current)
      : merge.strategy(options.strategy)(...configs, current)
  } else {
    return options.smart
      ? merge.smart(...configs, current)
      : merge(...configs, current)
  }
}

function getWebpackConfigs(options = {}) {
  // mode and target options should already be provided
  const { mode = 'development', target = 'browser', useVue } = options

  // NODE_ENV from environment overwrite options here
  if (!process.env.NODE_ENV) process.env.NODE_ENV = `${target}:${mode}`
  const isDebugMode = process.env[CTS.DEBUG] === 'true'

  // check if a custom config exists in the app source
  let appConfigs
  const configPath = path.join(
    process.cwd(),
    process.env[CTS.CONFIG] || 'app.config.js'
  )
  if (fs.existsSync(configPath)) {
    appConfigs = require(configPath)
  } else {
    appConfigs = useVue
      ? [require('../config/webpack.bundle.vue.js')]
      : [require('../config/webpack.bundle.default.js')]
  }

  const mergedConfig = merge(
    appConfigs.reduce(
      function(merged, config) {
        if (config.__mergeStrategy) {
          // merge with the previous configs using the provided strategy
          const options = Object.assign({}, config.__mergeStrategy)
          delete config.__mergeStrategy
          return [mergeWithOptions(options, merged, config)]
        } else {
          merged.push(config)
          return merged
        }
      },
      [{}]
    )
  )

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
      configs.push(isDebugMode ? smp.wrap(separateConfig) : separateConfig)
    }
    delete mergedConfig.multiple
  }

  // replace the first position placeholder in the list
  configs[0] = isDebugMode ? smp.wrap(mergedConfig) : mergedConfig

  return merge.multiple(configs)
}

module.exports = getWebpackConfigs
