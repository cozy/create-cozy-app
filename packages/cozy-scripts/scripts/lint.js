'use strict'

const spawn = require('cross-spawn')

module.exports = () => {
  const argv = process.argv.slice(3)

  spawn.sync('eslint', argv, { stdio: 'inherit' })
}
