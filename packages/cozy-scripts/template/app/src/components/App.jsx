import React from 'react'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'

import Sidebar from './Sidebar'

const Hello = (name) => (<p style='margin-left: 2em'>Just... Hello world! This is {name}</p>)

const Hello1 = () => Hello('View 1')
const Hello2 = () => Hello('View 2')
const Hello3 = () => Hello('View 3')

const App = ({ children }) => (
  <HashRouter>
    <div className='app-wrapper coz-sticky'>
      <Sidebar />
      <main className='app-content'>
        <Switch>
          <Route path='/viewhello1' component={Hello1} />
          <Route path='/viewhello2' component={Hello2} />
          <Route path='/viewhello3' component={Hello3} />
          <Redirect from='/' to='/viewhello1' />
        </Switch>
      </main>
    </div>
  </HashRouter>
)

export default App
