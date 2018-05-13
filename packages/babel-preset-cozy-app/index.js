'use strict'

const { declare } = require('@babel/helper-plugin-utils')

const browserEnv = {
  targets: {
    chrome: 42,
    ie: 10,
    firefox: 40,
    browsers: ['last 2 versions']
  },
  // don't transform polyfills
  useBuiltIns: false
}

const nodeEnv = {
  targets: {
    node: 8
  },
  // don't transform polyfills
  useBuiltIns: false
}

module.exports = declare((api, options, dirname) => {
  // default options
  let node = false
  let react = true

  if (options) {
    if (options.node) {
      if (typeof options.node !== 'boolean') {
        throw new Error("Preset cozy-app 'node' option must be a boolean.")
      }
      node = options.node
    }
    if (options.react) {
      if (typeof options.react !== 'boolean') {
        throw new Error("Preset cozy-app 'react' option must be a boolean.")
      }
      react = options.react
    }
  }

  const config = {}

  // Latest ECMAScript features on previous browsers versions
  let env = [require.resolve('babel-preset-env')]
  if (node) {
    env.push(nodeEnv)
  } else {
    env.push(browserEnv)
  }

  let presets = [env]
  // if (P)React app
  if (!node && react) presets.push(require.resolve('babel-preset-react'))
  config.presets = presets

  const plugins = [
    // transform class attributes and methods with auto-binding
    // to the class instance and no constructor needed
    require.resolve('babel-plugin-transform-class-properties')
  ]
  if (!node) {
    plugins.push(
      // Transform rest properties for object destructuring assignment
      // and spread properties for object literals
      // useBuiltIns to directly use Object.assign instead of using Babel extends
      [require.resolve('babel-plugin-transform-object-rest-spread'), {
        useBuiltIns: false
      }],
      // Polyfills generator functions (for async/await usage)
      [require.resolve('babel-plugin-transform-runtime'), {
        helpers: false,
        polyfill: false,
        regenerator: true
      }]
    )
  }
  config.plugins = plugins
  return config
})
