'use strict'
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'

import { createMockClient } from 'cozy-client'

import { TodoRemoveButton } from './TodoRemoveButton'
import mockTodos from '../__mocks__/todos.mocks.json'
import AppLike from '../../../../test/AppLike'

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
    const button = container.querySelector('button.todo-remove-button')

    expect(button).toBeDefined()
    expect(button.getAttribute('aria-busy')).toEqual(null)
    expect(button.getAttribute('disabled')).toEqual(null)
    fireEvent.click(button)
    expect(button.getAttribute('aria-busy')).toEqual('true')
    expect(button.getAttribute('disabled')).toEqual('')
  })

  it('should handle removeTodo correctly on button click', async () => {
    const { container } = setup()
    const button = container.querySelector('button.todo-remove-button')

    expect(button).toBeDefined()
    fireEvent.click(button)
    await waitFor(() => expect(client.destroy).toHaveBeenCalledTimes(1))
  })
})
