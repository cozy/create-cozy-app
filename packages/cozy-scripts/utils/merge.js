const merge = require('webpack-merge')

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

function mergeAppConfigs(appConfigs) {
  return merge(
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
}

module.exports = {
  mergeAppConfigs,
  mergeWithOptions
}
