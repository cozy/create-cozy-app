'use strict'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const colorize = require('../utils/_colorize.js')
const appConfig = require('./config')

const compiler = webpack(Object.assign({}, appConfig, {
  output: {
    filename: '[name][hash].bundle.js'
  }
}))

const server = new WebpackDevServer(compiler, {
  stats: { colors: true },
  inline: true,
  hot: true
})

const port = process.env.PORT || '8080'
const host = process.env.HOST || 'localhost'

server.listen(port, host, err => {
  console.log()
  if (err) {
    console.log(colorize.red(err))
  }
  console.log(colorize.green(`Your app is running at http://${host}:${port}`))
})
