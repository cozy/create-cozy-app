/* global cozy */

import 'babel-polyfill'
import Vue from 'vue'

import 'styles'

import store from 'lib/store'
import getI18nMixin from 'lib/I18n'

let appLocale
const renderApp = function () {
  const App = require('components/App').default
  Vue.mixin(getI18nMixin(
    appLocale,
    appLocale => require(`locales/${appLocale}`)
  ))
  return new Vue({
    store, // inject store to all children
    el: '[role=application]',
    render: h => h(App)
  })
}

if (module.hot) {
  module.hot.accept('components/App', function () {
    renderApp()
  })
}

// return a defaultData if the template hasn't been replaced by cozy-stack
const getDataOrDefault = function (toTest, defaultData) {
  const templateRegex = /^\{\{\.[a-zA-Z]*\}\}$/ // {{.Example}}
  return templateRegex.test(toTest) ? defaultData : toTest
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  // default data will allow to display correctly the cozy-bar
  // in the standalone (without cozy-stack connexion)
  const appIcon = getDataOrDefault(data.cozyIconPath, require('../vendor/assets/icon.svg'))

  const appEditor = getDataOrDefault(data.cozyAppEditor, '')

  const appName = getDataOrDefault(data.cozyAppName, require('../../../package.json').name)

  appLocale = getDataOrDefault(data.cozyLocale, 'en')

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

  renderApp()
})
