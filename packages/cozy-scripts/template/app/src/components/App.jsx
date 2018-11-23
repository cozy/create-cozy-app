import React from 'react'
import { hot } from 'react-hot-loader'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import { Layout, Main, Content } from 'cozy-ui/react/Layout'
import { Sprite as IconSprite } from 'cozy-ui/react/Icon'

import Sidebar from './Sidebar'
import Todos from './Todos'
import Hello1 from './HelloViews/Hello1'
import Hello2 from './HelloViews/Hello2'

const App = () => (
  <HashRouter>
    <Layout>
      <Sidebar />
      <Main>
        <Content className="app-content">
          <Switch>
            <Route path="/todos" component={Todos} />
            <Route path="/viewhello1" component={Hello1} />
            <Route path="/viewhello2" component={Hello2} />
            <Redirect from="/" to="/todos" />
            <Redirect from="*" to="/todos" />
          </Switch>
        </Content>
      </Main>
      <IconSprite />
    </Layout>
  </HashRouter>
)

/*
  Enable Hot Module Reload using `react-hot-loader` here
  We enable it here since App is the main root component
  No need to use it anywhere else, it sould work for all
  child components
*/
export default hot(module)(App)
