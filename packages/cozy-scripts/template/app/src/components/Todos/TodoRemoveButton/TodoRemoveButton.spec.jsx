import React from 'react'
import '@testing-library/jest-dom'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { createMockClient } from 'cozy-client'

import TodoRemoveButton from 'src/components/Todos/TodoRemoveButton/TodoRemoveButton'
import AppLike from 'test/AppLike'
import mockTodos from 'src/components/Todos/__mocks__/todos.mocks.json'

describe('TodoRemoveButton component:', () => {
  const todo = mockTodos[0]
  const client = createMockClient({})
  client.destroy = jest.fn()

  const setup = () => {
    return render(
      <AppLike client={client}>
        <TodoRemoveButton todo={todo} />
      </AppLike>
    )
  }

  beforeEach(() => {
    jest.resetAllMocks()
    // For clean: "Error: Not implemented: HTMLFormElement.prototype.submit"
    window._virtualConsole.emit = jest.fn()
  })

  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should handle isWorking correctly (display spinner)', () => {
    const { getByTestId } = setup()
    const button = getByTestId('submit-btn')

    expect(button).toBeDefined()
    expect(button).not.toHaveAttribute('disabled')

    fireEvent.click(button)
    expect(button).toHaveAttribute('disabled', '')
  })

  it('should handle removeTodo correctly on button click', async () => {
    const { getByTestId } = setup()
    const button = getByTestId('submit-btn')

    expect(button).toBeDefined()
    fireEvent.click(button)
    await waitFor(() => expect(client.destroy).toHaveBeenCalledTimes(1))
  })
})
