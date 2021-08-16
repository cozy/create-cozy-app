'use strict'
import React from 'react'
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
    const { container } = setup()
    const button = container.querySelector('button[type="submit"]')

    expect(button).toBeDefined()
    expect(button.getAttribute('aria-busy')).toEqual(null)
    expect(button.getAttribute('disabled')).toEqual(null)
    fireEvent.click(button)
    expect(button.getAttribute('aria-busy')).toEqual('true')
    expect(button.getAttribute('disabled')).toEqual('')
  })

  it('should handle removeTodo correctly on button click', async () => {
    const { container } = setup()
    const button = container.querySelector('button[type="submit"]')

    expect(button).toBeDefined()
    fireEvent.click(button)
    await waitFor(() => expect(client.destroy).toHaveBeenCalledTimes(1))
  })
})
