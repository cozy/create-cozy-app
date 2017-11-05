'use strict'

module.exports = {
  presets: [
    // Latest ECMAScript features on previous browsers versions
    [
      require.resolve('babel-preset-env'),
      {
        targets: {
          chrome: 42,
          ie: 10,
          firefox: 40,
          browsers: ['last 2 versions']
        },
        // don't transform polyfills
        useBuiltIns: false
      }
    ],
    // for JSX
    require.resolve('babel-preset-react')
  ],
  plugins: [
    // Transform rest properties for object destructuring assignment
    // and spread properties for object literals
    // useBuiltIns to directly use Object.assign instead of using Babel extends
    [require.resolve('babel-plugin-transform-object-rest-spread'), {
      useBuiltIns: true
    }],
    // transform class attributes and methods with auto-binding
    // to the class instance and no constructor needed
    require.resolve('babel-plugin-transform-class-properties'),
    // Polyfills generator functions (for async/await usage)
    [require.resolve('babel-plugin-transform-runtime'), {
      helpers: false,
      polyfill: false,
      regenerator: true
    }]
  ]
}
