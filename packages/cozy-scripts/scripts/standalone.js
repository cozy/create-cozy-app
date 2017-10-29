'use strict'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const colorize = require('../utils/_colorize.js')
const appConfig = require('./config.js')

const config = Object.assign({}, appConfig, {
  output: {
    filename: '[name][hash].bundle.js'
  }
})

const port = process.env.PORT || '8888'
const host = process.env.HOST || 'localhost'

const options = {
  stats: { colors: true },
  inline: true,
  hot: true,
  host,
  port
}

WebpackDevServer.addDevServerEntrypoints(config, options)

const compiler = webpack(config)
const server = new WebpackDevServer(compiler, options)

// There is no callback available on compiler here,
// it's not handled by webpack-dev-server 2.x
// see https://github.com/webpack/webpack-dev-server/issues/818
module.exports = () => {
  server.listen(port, host, err => {
    console.log()
    if (err) {
      server.close()
      throw new Error(colorize.red(err))
    }
    console.log(colorize.green(`Your app is running at http://${host}:${port}`))
  })
}
