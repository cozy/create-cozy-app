'use strict'

/* eslint-env jest */

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { TodoRemoveButton } from 'components/Todos/TodoRemoveButton'
import mockTodos from './_mocksTodos.json'
import { createMockClient } from 'cozy-client'
import AppLike from '../../AppLike'

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

  beforeEach(() => jest.resetAllMocks())

  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toMatchSnapshot()
  })

  it('should handle isWorking correctly (display spinner)', () => {
    const { container } = setup()
    const button = container.querySelector('button.todo-remove-button')
    expect(button).not.toBe(null)

    expect(button.getAttribute('aria-busy')).toEqual(null)
    expect(button.getAttribute('disabled')).toEqual(null)

    fireEvent.click(button)

    expect(button.getAttribute('aria-busy')).toEqual('true')
    expect(button.getAttribute('disabled')).toEqual('')
  })

  it('should handle removeTodo correctly on button click', async () => {
    const { container } = setup()
    const button = container.querySelector('button.todo-remove-button')
    expect(button).not.toBe(null)

    fireEvent.click(button)

    await waitFor(() => expect(client.destroy).toHaveBeenCalledTimes(1))
  })
})
