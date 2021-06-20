'use strict'

/* eslint-env jest */

import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { createMockClient } from 'cozy-client'

// we import the not connected component version for testing
import { TodoAdd } from 'components/Todos/TodoAdd'
import mockTodos from './_mocksTodos.json'
import AppLike from '../../AppLike'

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

  beforeEach(() => jest.resetAllMocks())

  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toMatchSnapshot()
  })

  it('should handle isWorking correctly (display spinner)', async () => {
    const { container } = setup()
    const submitButton = container.querySelector('button[type="submit"]')

    expect(submitButton).not.toBe(null)
    expect(submitButton.getAttribute('aria-busy')).toEqual(null)
    fireEvent.click(submitButton)
    expect(submitButton.getAttribute('aria-busy')).toEqual('true')
    await waitFor(() =>
      expect(submitButton.getAttribute('aria-busy')).toEqual(null)
    )
  })

  it('should handle save correctly on button click', async () => {
    const { container } = setup()
    const input = container.querySelector('input#todo-add-input')
    expect(input).not.toBe(null)
    fireEvent.change(input, targetValue(todo.name))

    const submitButton = container.querySelector('button[type="submit"]')
    expect(submitButton).not.toBe(null)
    fireEvent.click(submitButton)
    await waitFor(() => expect(client.save).toHaveBeenCalledTimes(1))
  })

  it('should update the state on input value change', () => {
    const { container } = setup()

    const input = container.querySelector('input#todo-add-input')
    expect(input).not.toBe(null)
    expect(input.value).toBe('')
    fireEvent.change(input, targetValue(todo.name))
    expect(input.value).toBe(todo.name)
  })
})
