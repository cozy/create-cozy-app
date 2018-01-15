'use strict'

const Progress = require('progress')
const webpack = require('webpack')

// FIXME For some weird reasons, hex is not available from chalk in the jest
// tests environment, so we have to explicitly use colors ansi characters
// const colorize = require('../utils/_colorize')
// const percent = colorize.blue(':percent')
// const completeElement = colorize.bgBlue(' ')
// const incompleteElement = colorize.bgWhite(' ')

function CustomProgressPlugin () {
  if (!process.stderr.isTTY) {
    return function () {}
  }

  const progressBar = new Progress(
    // message template
    [
      ':bar',
      '\u001b[38;2;41;126;242m:percent\u001b[39m',
      ':msg'
    ].join(' '),
    // progress bar options
    {
      complete: '\u001b[48;2;41;126;242m \u001b[49m',
      incomplete: '\u001b[47m \u001b[49m',
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
    CustomProgressPlugin()
  ]
}
