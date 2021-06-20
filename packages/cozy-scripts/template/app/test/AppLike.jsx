import React from 'react'
import { CozyProvider, createMockClient } from 'cozy-client'
import I18n from 'cozy-ui/react/I18n'
import { BreakpointsProvider } from 'cozy-ui/react/hooks/useBreakpoints'
import { HashRouter } from 'react-router-dom'
import enLocale from '../src/locales/en.json'

const AppLike = ({ children, client }) => (
  <I18n dictRequire={() => enLocale} lang="en">
    <CozyProvider client={client || createMockClient({})}>
      <BreakpointsProvider>
        <HashRouter>{children}</HashRouter>
      </BreakpointsProvider>
    </CozyProvider>
  </I18n>
)

export default AppLike
