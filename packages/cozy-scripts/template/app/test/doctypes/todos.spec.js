'use strict'

/* eslint-env jest */

import { todosQuery, TODOS_DOCTYPE } from 'doctypes'

const mockClient = {
  find: jest.fn(),
  create: jest.fn(),
  destory: jest.fn()
}

describe('Doctypes queries', () => {
  beforeEach(() => {
    // reset all jest mock calls data before each test
    jest.resetAllMocks()
  })

  it('should find todos correctly with todosQuery', () => {
    todosQuery(mockClient)
    expect(mockClient.find.mock.calls.length).toBe(1)
    expect(mockClient.find.mock.calls[0][0]).toBe(TODOS_DOCTYPE)
  })
})
