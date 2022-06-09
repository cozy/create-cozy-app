'use strict'

const path = require('path')
const fs = require('fs')

const { target } = require('./webpack.vars')
const targetConfig = require(`./webpack.target.${target}`)
const paths = require('../utils/paths')

module.exports = {
  plugins: [
    // Extracts Hash in external file for reference
    function() {
      this.plugin('done', stats => {
        fs.writeFileSync(
          path.join(targetConfig.output.path, paths.appBuildAssetsJson()),
          `{"hash":"${stats.hash}"}`
        )
      })
    }
  ]
}
