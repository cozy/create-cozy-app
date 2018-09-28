'use script'

const colors = {
  green: '\u001b[38;2;8;180;66m',
  close: '\u001b[39m'
}

module.exports = function init() {
  console.log()
  console.log(
    `${colors.green}✔${
      colors.close
    } create-cozy-app scripts init(...) call test succeed.`
  )
  console.log()
  return true
}
