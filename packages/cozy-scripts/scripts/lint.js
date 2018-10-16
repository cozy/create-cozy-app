'use strict'

const { exec } = require('child_process')

module.exports = () => {
  const argv = process.argv.slice(3)

  exec(`eslint ${argv.join(' ')}`, (err, stdout) => {
    console.log(stdout)
  })
}
