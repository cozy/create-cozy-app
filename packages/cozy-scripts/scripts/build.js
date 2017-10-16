'use strict'

const webpack = require('webpack')
const appConfig = require('./config')

const compiler = webpack(Object.assign({}, appConfig, {
  bail: true
}))

compiler.run((err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(stats.toString({
    chunks: false,  // Makes the build much quieter
    colors: true    // Shows colors in the console
  }))
})
