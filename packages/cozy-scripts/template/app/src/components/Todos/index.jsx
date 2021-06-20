import React from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import { getAllTodos } from '../../utils/queries'
import TodoAdd from './TodoAdd/TodoAdd'
import TodosList from './TodoList/TodosList'

export const Todos = () => {
  const { data, ...rest } = useQuery(
    getAllTodos.definition,
    getAllTodos.options
  )

  return (
    <div className="todos">
      {isQueryLoading(rest) ? (
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

export default Todos
