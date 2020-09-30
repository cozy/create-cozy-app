module.exports = {
  testURL: 'http://localhost/',
  moduleFileExtensions: ['js', 'jsx', 'json', 'styl'],
  setupFiles: ['<rootDir>/src/jest.setup.js'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    'cozy-client': 'cozy-client/dist/index.js',
    '\\.(png|gif|jpe?g|svg)$': '<rootDir>/src/__mocks__/fileMock.js',
    // identity-obj-proxy module is installed by cozy-scripts
    '\\.styl$': 'identity-obj-proxy'
  },
  transformIgnorePatterns: ['node_modules/(?!cozy-ui)'],
  globals: {
    __ALLOW_HTTP__: false,
    __TARGET__: 'browser',
    cozy: {}
  }
}
