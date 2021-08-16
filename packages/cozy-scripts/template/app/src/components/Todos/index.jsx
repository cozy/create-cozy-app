import React from 'react'

import { useQuery, isQueryLoading } from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import { getAllTodos } from 'src/utils/queries'
import TodoAdd from 'src/components/Todos/TodoAdd/TodoAdd'
import TodoList from 'src/components/Todos/TodoList/TodoList'

export const Todos = () => {
  const { data, ...rest } = useQuery(
    getAllTodos.definition,
    getAllTodos.options
  )

  return isQueryLoading(rest) ? (
    <Spinner size="xxlarge" className="u-flex u-flex-justify-center" />
  ) : (
    <>
      <TodoList todos={data} />
      <TodoAdd />
    </>
  )
}

export default Todos
