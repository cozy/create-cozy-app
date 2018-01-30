'use strict'

const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const paths = require('../utils/paths')
const { target } = require('./webpack.vars')

const servicesFolder = paths.appServicesFolder
const servicesPaths = fs.readdirSync(servicesFolder)

const servicesEntries = {}
servicesPaths.forEach(file => {
  if (!file.match(/^[^.]*.js$/)) return
  var filename = file.match(/^([^.]*).js$/)[1]
  servicesEntries[filename] = path.resolve(
    path.join(servicesFolder, file)
  )
})

const config = {
  __mergeStrategy: {
    smart: false,
    strategy: {
      plugins: 'replace',
      output: 'replace',
      entry: 'replace'
    }
  },
  entry: servicesEntries,
  target: 'node',
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('services')
    })
  ]
}

// only for browser target (services are usable only on cozy-stack)
module.exports = target === 'browser'
  ? { multiple: { services: config } }
  : {}
