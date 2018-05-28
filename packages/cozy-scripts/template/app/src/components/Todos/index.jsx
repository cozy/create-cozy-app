import React from 'react'

import Spinner from 'cozy-ui/react/Spinner'
import TodoAdd from './TodoAdd'
import TodosList from './TodosList'
import { withTodos } from 'connections/allTodos'

export const Todos = props => {
  const { data, fetchStatus } = props
  // cozy-client statuses
  const isLoading = fetchStatus === 'loading' || fetchStatus === 'pending'
  return (
    <div className="todos">
      {isLoading ? (
        <Spinner size="xxlarge" middle />
      ) : (
        <div>
          <TodosList todos={data} />
          <TodoAdd />
        </div>
      )}
    </div>
  )
}

// get data from the client state: data, fetchStatus
export default withTodos(Todos)
