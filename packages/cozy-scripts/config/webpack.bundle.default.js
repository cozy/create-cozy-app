'use strict'

const merge = require('webpack-merge')
const { environment, target, addAnalyzer } = require('./webpack.vars')

const configs = [
  require('./webpack.config.base'),
  require('./webpack.config.chunks'),
  require('./webpack.config.react'),
  require('./webpack.config.eslint'),
  require('./webpack.config.cozy-ui'),
  require('./webpack.config.cozy-ui.react'),
  require('./webpack.config.intents'),
  require('./webpack.config.public'),
  require('./webpack.config.pictures'),
  require('./webpack.config.vendors'),
  require('./webpack.config.manifest'),
  require('./webpack.config.progress'),
  addAnalyzer ? require('./webpack.config.analyzer') : null,
  require('./webpack.config.services'),
  require(`./webpack.target.${target}`)
]

if (environment === 'production') {
  configs.push(require('./webpack.environment.prod'))
} else {
  configs.push(require('./webpack.environment.dev'))
}

module.exports = merge.apply(null, configs)
