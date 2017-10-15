/* global cozy, __DEVELOPMENT__ */

import 'babel-polyfill'

import './styles'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { I18n } from 'cozy-ui/react/I18n'

import store from './lib/store'
import App from './App'

if (__DEVELOPMENT__) {
  // Enables React dev tools for Preact
  // Cannot use import as we are in a condition
  require('preact/devtools')

  // Export React to window for the devtools
  window.React = React
}

const renderApp = function (lang) {
  render(
    <I18n lang={lang} dictRequire={(lang) => require(`./locales/${lang}`)}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18n>
  , document.querySelector('[role=application]'))
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  cozy.client.init({
    cozyURL: '//' + data.cozyDomain,
    token: data.cozyToken
  })
  cozy.bar.init({
    appEditor: data.cozyAppEditor,
    appName: data.cozyAppName,
    iconPath: data.cozyIconPath,
    lang: data.cozyLocale,
    replaceTitleOnMobile: true
  })

  renderApp(data.cozyLocale)
})
