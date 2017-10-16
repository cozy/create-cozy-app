'use strict'

const webpack = require('webpack')
const appConfig = require('./config')

const compiler = webpack(Object.assign({}, appConfig, {
  bail: true
}))

compiler.watch({}, (err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(stats.toString({
    modules: true, // display modules
    chunks: true,  // display chunks
    colors: true    // Shows colors in the console
  }))
})
