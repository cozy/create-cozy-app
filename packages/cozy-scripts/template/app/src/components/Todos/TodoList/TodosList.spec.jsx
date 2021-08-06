'use strict'
import React from 'react'
import { render, waitFor } from '@testing-library/react'

import { TodosList } from './TodosList'
import AppLike from '../../../../test/AppLike'
import mockTodos from '../__mocks__/todos.mocks.json'

const setup = todos => {
  return render(
    <AppLike>
      <TodosList todos={todos} />
    </AppLike>
  )
}

describe('TodosList component:', () => {
  it('should be rendered correctly', () => {
    const { container } = setup([])

    expect(container).toBeDefined()
  })

  it('should be rendered correctly without todos', async () => {
    const { container } = setup([])

    await waitFor(() => {
      expect(container.querySelector('todos-list')).toBeNull()
    })
  })

  it('should be rendered correctly with todos', async () => {
    const { getByText } = setup(mockTodos)

    await waitFor(() => {
      expect(getByText('Todos list:'))
      expect(getByText('Todo 1'))
      expect(getByText('Todo 2'))
      expect(getByText('Todo 3'))
    })
  })
})
