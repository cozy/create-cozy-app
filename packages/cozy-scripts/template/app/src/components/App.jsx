/* global cozy */
import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import cx from 'classnames'

import { useClient } from 'cozy-client'
import { Layout, Main, Content } from 'cozy-ui/transpiled/react/Layout'
import IconSprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import BarTitle from 'cozy-ui/transpiled/react/BarTitle'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import Sidebar from 'src/components/Sidebar'
import TodoWrapper from 'src/components/Todos/TodoWrapper'
import Hello1 from 'src/components/HelloViews/Hello1'
import Hello2 from 'src/components/HelloViews/Hello2'

const App = () => {
  const { t } = useI18n()
  const client = useClient()
  const { isMobile } = useBreakpoints()
  const { BarCenter } = cozy.bar

  return (
    <HashRouter>
      <Layout>
        {isMobile && (
          <BarCenter>
            <MuiCozyTheme>
              <BarTitle>{client.appMetadata.slug}</BarTitle>
            </MuiCozyTheme>
          </BarCenter>
        )}
        <Sidebar />
        <Main>
          <Content
            className={cx({
              'u-mh-half u-mv-1': isMobile,
              'u-mh-2 u-mv-1': !isMobile
            })}
          >
            <Switch>
              <Route path="/todos" component={TodoWrapper} />
              <Route path="/viewhello1" component={Hello1} />
              <Route path="/viewhello2" component={Hello2} />
              <Redirect from="/" to="/todos" />
              <Redirect from="*" to="/todos" />
            </Switch>
          </Content>
        </Main>
        <Alerter t={t} />
        <IconSprite />
      </Layout>
    </HashRouter>
  )
}

/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/
export default hot(module)(App)
