module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: require.resolve('babel-loader'),
        options: {
          presets: ['cozy-app', '@babel/typescript']
        }
      }
    ]
  }
}
