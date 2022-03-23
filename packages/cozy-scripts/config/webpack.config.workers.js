'use strict'

const path = require('path')
const fs = require('fs-extra')
const webpack = require('webpack')
const paths = require('../utils/paths')
const { getFilename, target } = require('./webpack.vars')

const servicesWorkersFolder = paths.appServicesWorkersFolder()
const servicesWorkersPaths = fs.existsSync(servicesWorkersFolder)
  ? fs.readdirSync(servicesWorkersFolder)
  : []

const servicesWorkersEntries = {}
servicesWorkersPaths.forEach(file => {
  if (!file.match(/^[^.]*.js$/)) return
  var filename = file.match(/^([^.]*).js$/)[1]
  servicesWorkersEntries[filename] = path.resolve(
    path.join(servicesWorkersFolder, file)
  )
})

const config = {
  __mergeStrategy: {
    smart: false,
    strategy: {
      plugins: 'replace',
      output: 'replace',
      entry: 'replace',
      optimization: 'replace',
      module: 'replace',
      externals: 'replace'
    }
  },
  entry: servicesWorkersEntries,
  output: {
    path: paths.appServicesWorkersBuild(),
    filename: `${getFilename(false)}.js`
  },
  target: 'node',
  optimization: {}, // reset optimization property
  devtool: false,
  externals: [], // reset externals property
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: 'node_modules/.cache/babel-loader/node',
          babelrc: false,
          presets: [['cozy-app', { node: true, react: false }]]
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('servicesWorkers')
    })
  ]
}

/* We don't build services workers if no services workers and if on mobile build */
const addServicesWorkersConfig =
  target === 'browser' && Object.keys(servicesWorkersEntries).length

// only for browser target (servicesWorkers are usable only on cozy-stack)
module.exports = addServicesWorkersConfig
  ? { multiple: { servicesWorkers: config } }
  : {}
