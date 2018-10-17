'use strict'

const spawn = require('cross-spawn')
const colorize = require('../utils/_colorize')
const paths = require('../utils/paths')

module.exports = () => {
  const argv = process.argv.slice(3)

  console.info(colorize.orange(`eslint ${argv.join(' ')}`))
  spawn.sync(paths.csEslintBinary, argv, { stdio: 'inherit' })
}
