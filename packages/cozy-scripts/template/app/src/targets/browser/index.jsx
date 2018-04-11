/* global cozy, __DEVELOPMENT__ */

import 'babel-polyfill'

import 'styles'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { I18n } from 'cozy-ui/react/I18n'

import store from 'lib/store'

if (__DEVELOPMENT__) {
  // Enables React dev tools for Preact
  // Cannot use import as we are in a condition
  require('preact/devtools')

  // Export React to window for the devtools
  window.React = React
}

let appLocale
const renderApp = function() {
  const App = require('components/App').default
  render(
    <I18n
      lang={appLocale}
      dictRequire={appLocale => require(`locales/${appLocale}`)}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </I18n>,
    document.querySelector('[role=application]')
  )
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

  // default data will allow to display correctly the cozy-bar
  // in the standalone (without cozy-stack connexion)
  const appIcon = getDataOrDefault(
    data.cozyIconPath,
    require('../vendor/assets/icon.svg')
  )

  const appEditor = getDataOrDefault(data.cozyAppEditor, '')

  const appName = getDataOrDefault(
    data.cozyAppName,
    require('../../../package.json').name
  )

  appLocale = getDataOrDefault(data.cozyLocale, 'en')

  const protocol = window.location ? window.location.protocol : 'https:'

  cozy.client.init({
    cozyURL: `${protocol}//${data.cozyDomain}`,
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
