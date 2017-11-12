/* global cozy */

// return a defaultData if the template hasn't been replaced by cozy-stack
const getDataOrDefault = function (toTest, defaultData) {
  const templateRegex = /^\{\{\.[a-zA-Z]*\}\}$/ // {{.Example}}
  return templateRegex.test(toTest) ? defaultData : toTest
}

// initialise cozy-bar and cozy-client
document.addEventListener('DOMContentLoaded', () => {
  var root = document.querySelector('[role=application]')
  var data = root.dataset

  // default data will allow to display correctly the cozy-bar
  // in the standalone (without cozy-stack connexion)
  var appIcon = getDataOrDefault(data.cozyIconPath, './icon.svg')

  var appEditor = getDataOrDefault(data.cozyAppEditor, '')

  var appName = getDataOrDefault(data.cozyAppName, 'hello-world')

  var appLocale = getDataOrDefault(data.cozyLocale, 'en')

  cozy.client.init({
    cozyURL: '//' + data.cozyDomain,
    token: data.cozyToken
  })

  cozy.bar.init({
    appEditor: appEditor,
    appName: appName,
    iconPath: appIcon,
    lang: appLocale,
    replaceTitleOnMobile: true
  })
})
