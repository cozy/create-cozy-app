module.exports = {
  testURL: 'http://localhost/',
  moduleFileExtensions: [
    'js',
    'vue',
    'json',
    'styl'
  ],
  setupFiles: [
    '<rootDir>/test/jestLib/setup.js'
  ],
  moduleDirectories: [
    'node_modules',
    'src'
  ],
  // jest modules installed by cozy-scripts
  transform: {
    '^.+\\.js$': 'babel-jest',
    // for some weird reasons we have to specify the full path here
    '.*\\.vue$': '<rootDir>/node_modules/cozy-scripts/node_modules/vue-jest'
  },
  moduleNameMapper: {
    '\\.(png|gif|jpe?g|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
    // identity-obj-proxy module is installed by cozy-scripts
    'styles': 'identity-obj-proxy'
  },
  snapshotSerializers: [
    '<rootDir>/node_modules/jest-serializer-vue'
  ],
  transformIgnorePatterns: [
    'node_modules/(?!cozy-ui)'
  ],
  globals: {
    '__ALLOW_HTTP__': false,
    '__TARGET__': 'browser',
    'cozy': {}
  }
}
