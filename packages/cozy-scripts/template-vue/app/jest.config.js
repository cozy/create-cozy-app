module.exports = {
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
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
  },
  moduleNameMapper: {
    '\\.(png|gif|jpe?g|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
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
