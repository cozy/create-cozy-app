import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'

import 'src/styles/index.styl'

import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  StylesProvider,
  createGenerateClassName
} from 'cozy-ui/transpiled/react/styles'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { CozyProvider } from 'cozy-client'

import setupApp from 'src/targets/browser/setupApp'
import AppRouter from 'src/components/AppRouter'

/*
With MUI V4, it is possible to generate deterministic class names.
In the case of multiple react roots, it is necessary to disable this
feature. Since we have the cozy-bar root, we need to disable the
feature.
https://material-ui.com/styles/api/#stylesprovider
*/
const generateClassName = createGenerateClassName({
  disableGlobal: true
})

const init = () => {
  const { container, client, lang, polyglot } = setupApp()
  const root = createRoot(container)

  root.render(
    <StylesProvider generateClassName={generateClassName}>
      <CozyProvider client={client}>
        <I18n lang={lang} polyglot={polyglot}>
          <MuiCozyTheme>
            <BreakpointsProvider>
              <AppRouter />
            </BreakpointsProvider>
          </MuiCozyTheme>
        </I18n>
      </CozyProvider>
    </StylesProvider>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  init()
})

if (module.hot) {
  init()
  module.hot.accept()
}
