'use strict'

const fs = require('fs-extra')
const paths = require('./paths')

module.exports = target => {
  if (target === 'mobile') {
    fs.emptyDir(paths.appMobileWWW())
  } else if (target === 'browser') {
    fs.emptyDir(paths.appBuild())
  } else {
    console.warn(`No build folder found to clean (target ${target}).`)
  }
}
