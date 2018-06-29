'use strict'

const fs = require('fs-extra')
const paths = require('./paths')

module.exports = target => {
  if (target === 'mobile') {
    if (fs.existsSync(paths.appMobileWWW)) fs.removeSync(paths.appMobileWWW)
  } else if (target === 'browser') {
    if (fs.existsSync(paths.appBuild)) fs.removeSync(paths.appBuild)
  } else {
    console.warn(`No build folder found to clean (target ${target}).`)
  }
}
