'use strict'

const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const colorize = require('../utils/_colorize.js')
const appConfig = require('./config')

const config = Object.assign({}, appConfig, {
  output: {
    filename: '[name][hash].bundle.js'
  }
})

const port = process.env.PORT || '8080'
const host = process.env.HOST || 'localhost'

const options = {
  stats: { colors: true },
  inline: true,
  hot: true,
  host,
  port
}

webpackDevServer.addDevServerEntrypoints(config, options);

const compiler = webpack(config)
const server = new webpackDevServer(compiler, options)

server.listen(port, host, err => {
  console.log()
  if (err) {
    console.log(colorize.red(err))
  }
  console.log(colorize.green(`Your app is running at http://${host}:${port}`))
})
