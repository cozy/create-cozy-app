'use strict'

const { exec } = require('child_process')

const globs = {
  react: '{src,test}/**/*.{js,jsx}',
  vue: '{src,test}/**/*.{js,vue}'
}

module.exports = buildOptions => {
  const argv = process.argv.slice(3)
  const glob = buildOptions.useVue ? globs.vue : globs.react

  exec(`eslint '${glob}' ${argv.join(' ')}`, (err, stdout) => {
    console.log(stdout)
  })
}
