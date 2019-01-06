module.exports = function regexpReplacer(key, value) {
  if (value instanceof RegExp) {
    return value.toString()
  }

  return value
}
