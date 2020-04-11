module.exports = {
  loader: require.resolve('postcss-loader'),
  options: {
    ident: 'postcss',
    sourceMap: true,
    plugins: function() {
      return [require('autoprefixer')({ browsers: ['last 2 versions'] })]
    }
  }
}
