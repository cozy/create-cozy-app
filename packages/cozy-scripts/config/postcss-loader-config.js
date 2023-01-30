module.exports = {
  loader: require.resolve('postcss-loader'),
  options: {
    sourceMap: true,
    postcssOptions: {
      plugins: [require('autoprefixer')()]
    }
  }
}
