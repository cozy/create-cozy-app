import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { createMockClient } from 'cozy-client'

// we import the not connected component version for testing
import TodoAdd from 'src/components/Todos/TodoAdd/TodoAdd'
import AppLike from 'test/AppLike'
import mockTodos from 'src/components/Todos/__mocks__/todos.mocks.json'

const targetValue = value => ({
  target: {
    value
  }
})

describe('TodoAdd component:', () => {
  const client = createMockClient({})
  client.save = jest.fn(() => Promise.resolve(todo))
  const todo = mockTodos[0]
  const setup = () => {
    return render(
      <AppLike client={client}>
        <TodoAdd />
      </AppLike>
    )
  }

  beforeEach(() => {
    jest.resetAllMocks()
    // For clean: Error: Not implemented: HTMLFormElement.prototype.submit
    window._virtualConsole.emit = jest.fn()
  })

  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should handle isWorking correctly (display spinner)', async () => {
    const { getByTestId } = setup()
    const submitButton = getByTestId('submit-btn')

    expect(submitButton).toBeDefined()
    fireEvent.click(submitButton)
    expect(submitButton).toHaveAttribute('disabled', '')
    await waitFor(() =>
      expect(submitButton).not.toHaveAttribute('disabled', '')
    )
  })

  it('should handle save correctly on button click', async () => {
    const { getByTestId } = setup()
    const input = getByTestId('todo-add-input')
    const submitButton = getByTestId('submit-btn')

    expect(input).toBeDefined()
    fireEvent.change(input, targetValue(todo.name))
    expect(submitButton).toBeDefined()
    fireEvent.click(submitButton)
    await waitFor(() => expect(client.save).toHaveBeenCalledTimes(1))
  })

  it('should update the state on input value change', () => {
    const { getByTestId } = setup()
    const input = getByTestId('todo-add-input')

    expect(input).toBeDefined()
    expect(input.value).toBe('')
    fireEvent.change(input, targetValue(todo.name))
    expect(input.value).toBe(todo.name)
  })
})
