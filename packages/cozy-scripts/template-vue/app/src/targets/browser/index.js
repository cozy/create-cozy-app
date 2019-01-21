/* global cozy */

import Vue from 'vue'

import 'styles'

import store from 'lib/store'
import getI18nMixin from 'lib/I18n'

let appLocale
const renderApp = function() {
  const App = require('components/App').default
  Vue.mixin(
    getI18nMixin(appLocale, appLocale => require(`locales/${appLocale}`))
  )
  return new Vue({
    store, // inject store to all children
    el: '[role=application]',
    render: h => h(App)
  })
}

if (module.hot) {
  module.hot.accept('components/App', function() {
    renderApp()
  })
}

// return a defaultData if the template hasn't been replaced by cozy-stack
const getDataOrDefault = function(toTest, defaultData) {
  const templateRegex = /^\{\{\.[a-zA-Z]*\}\}$/ // {{.Example}}
  return templateRegex.test(toTest) ? defaultData : toTest
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  const appIcon = getDataOrDefault(
    data.cozyIconPath,
    require('../assets/icon.svg')
  )

  const appNamePrefix = getDataOrDefault(
    data.cozyAppNamePrefix || require('../../../manifest.webapp').name_prefix,
    ''
  )

  const appName = getDataOrDefault(
    data.cozyAppName,
    require('../../../manifest.webapp').name
  )

  appLocale = getDataOrDefault(data.cozyLocale, 'en')

  const protocol = window.location ? window.location.protocol : 'https:'

  cozy.client.init({
    cozyURL: `${protocol}//${data.cozyDomain}`,
    token: data.cozyToken
  })
  cozy.bar.init({
    appName: appName,
    appNamePrefix: appNamePrefix,
    iconPath: appIcon,
    lang: appLocale,
    replaceTitleOnMobile: true
  })

  renderApp()
})
