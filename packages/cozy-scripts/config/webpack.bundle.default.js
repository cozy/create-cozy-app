'use strict'

const { environment, target } = require('./webpack.vars')

const configs = [
  require('./webpack.config.base'),
  require('./webpack.config.preact'),
  require('./webpack.config.eslint'),
  require('./webpack.config.cozy-ui'),
  require('./webpack.config.cozy-ui.react'),
  require('./webpack.config.pictures'),
  require('./webpack.config.vendors'),
  require('./webpack.config.manifest'),
  require(`./webpack.target.${target}`)
]

if (environment === 'production') {
  configs.push(require('./webpack.environment.prod'))
} else {
  configs.push(require('./webpack.environment.dev'))
}

module.exports = configs
