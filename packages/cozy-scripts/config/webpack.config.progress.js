'use strict'

const webpack = require('webpack')
const colorize = require('../utils/_colorize')
const Progress = require('../utils/progress')

function CustomProgressPlugin() {
  if (!process.stderr.isTTY) {
    return function() {}
  }

  const progressBar = new Progress(
    // message template
    [':bar', colorize.blue(':percent'), ':msg'].join(' '),
    // progress bar options
    {
      complete: colorize.bgBlue(' '),
      incomplete: colorize.bgWhite(' '),
      width: 2000, // exceed length is handled
      offset: 40, // right offset to have enough space for webpack message
      total: 100,
      clear: false
    }
  )

  return new webpack.ProgressPlugin(function(percentage, msg) {
    progressBar.update(percentage, { msg: msg })
  })
}

module.exports = {
  plugins: [CustomProgressPlugin()]
}
