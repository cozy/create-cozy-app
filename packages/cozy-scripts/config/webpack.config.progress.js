'use strict'

const Progress = require('progress')
const webpack = require('webpack')
const colorize = require('../utils/_colorize')

function CustomProgressPlugin () {
  if (!process.stderr.isTTY) {
    return function () {}
  }

  const progressBar = new Progress(
    // message template
    [':bar', colorize.blue(':percent'), ':msg'].join(' '),
    // progress bar options
    {
      complete: colorize.bgBlue(' '),
      incomplete: colorize.bgWhite(' '),
      width: 2000, // exceed length is handled
      total: 100,
      clear: false
    }
  )

  return new webpack.ProgressPlugin(function (percentage, msg) {
    progressBar.update(percentage, { msg: msg })
  })
}

module.exports = {
  plugins: [
    new CustomProgressPlugin()
  ]
}
