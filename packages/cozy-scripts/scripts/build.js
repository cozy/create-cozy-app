'use strict'

const webpack = require('webpack')
const configs = require('./config')

const compiler = webpack(configs)

// add a way to provide success callback for (at least) better tests
module.exports = (successCallback) => {
  compiler.run((err, stats) => {
    if (err) {
      console.error(err)
      return
    }

    console.log(stats.toString({
      chunks: false,  // Makes the build much quieter
      modules: false,
      colors: true    // Shows colors in the console
    }))

    if (typeof successCallback === 'function') successCallback()
  })
}
