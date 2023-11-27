module.exports = {
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        loader: require.resolve('babel-loader')
      }
    ]
  }
}
