import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'

import Sidebar from './Sidebar'
import Hello1 from './HelloViews/Hello1'
import Hello2 from './HelloViews/Hello2'
import Hello3 from './HelloViews/Hello3'

const App = () => (
  <HashRouter>
    <div className="app-wrapper o-layout--2panes">
      <Sidebar />
      <main className="app-content">
        <Switch>
          <Route path="/viewhello1" component={Hello1} />
          <Route path="/viewhello2" component={Hello2} />
          <Route path="/viewhello3" component={Hello3} />
          <Redirect from="/" to="/viewhello1" />
          <Redirect from="*" to="/viewhello1" />
        </Switch>
      </main>
    </div>
  </HashRouter>
)

export default App
