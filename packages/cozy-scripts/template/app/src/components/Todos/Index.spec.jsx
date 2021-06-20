'use strict'
import React from 'react'
import { render, waitFor } from '@testing-library/react'

import { isQueryLoading } from 'cozy-client'

// we import the not connected component version for testing
import { Todos } from '.'
import AppLike from '../../../test/AppLike'
import mockTodos from './__mocks__/todos.mocks.json'

jest.mock('cozy-client/dist/hooks/useQuery', () =>
  jest.fn(() => ({
    data: mockTodos
  }))
)
jest.mock('cozy-client/dist/utils', () => ({
  ...jest.requireActual('cozy-client/dist/utils'),
  isQueryLoading: jest.fn()
}))

const setup = (isLoading = true) => {
  isQueryLoading.mockReturnValue(isLoading)
  return render(
    <AppLike>
      <Todos />
    </AppLike>
  )
}

describe('Todos component:', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should be rendered correctly', () => {
    const { container } = setup()

    expect(container).toBeDefined()
  })

  it('should be rendered correctly with todos', async () => {
    const { getByText } = setup(false)

    await waitFor(() => {
      expect(getByText('Todos list:'))
      expect(getByText('Todo 1'))
      expect(getByText('Todo 2'))
      expect(getByText('Todo 3'))
      expect(getByText('Add a new Todo:'))
    })
  })

  it('should render a spinner if loading', async () => {
    const { container } = setup(true)

    await waitFor(() => {
      expect(container.querySelector('[role="progressbar"]')).toBeDefined()
    })
  })
})
