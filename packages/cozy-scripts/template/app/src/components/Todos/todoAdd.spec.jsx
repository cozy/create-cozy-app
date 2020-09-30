'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

// we import the not connected component version for testing
import { TodoAdd } from 'components/Todos/TodoAdd'
import { TODOS_DOCTYPE } from 'doctypes'
import Input from 'cozy-ui/react/Input'

// mock data for testing
import mockTodos from './_mocksTodos.json'

const created = mockTodos[0]
// async mock function
const mockCreateTodo = jest.fn(() => Promise.resolve(created))

describe('TodoAdd component:', () => {
  beforeEach(() => {
    // reset all jest mock calls data before each test
    jest.resetAllMocks()
  })

  const setup = () => {
    const client = {
      save: mockCreateTodo
    }
    const component = shallow(<TodoAdd client={client} />)
    return { component }
  }

  it('should be rendered correctly', () => {
    const { component } = setup()
    expect(component.getElement()).toMatchSnapshot()
  })

  it('should handle isWorking correctly (display spinner)', () => {
    const { component } = setup()

    expect(component.state().isWorking).toBe(false)
    component.setState({ isWorking: true })
    expect(component.getElement()).toMatchSnapshot()
  })

  it('should handle createDocument correctly on button click', async () => {
    const { component } = setup()
    // set a todo name value
    component.setState({ todoToAdd: created.name })

    const addButton = component.find('form')
    await addButton.simulate('submit')

    expect(mockCreateTodo.mock.calls.length).toBe(1)
    expect(mockCreateTodo.mock.calls[0][0]).toEqual({
      _type: TODOS_DOCTYPE,
      name: 'Todo 1'
    })
  })

  it('should update the state on input value change', () => {
    const { component } = setup()
    const input = component.find(Input)

    expect(component.state().todoToAdd).toBe('')
    input.simulate('change', { target: { value: created.name } })
    expect(component.state().todoToAdd).toBe(created.name)
  })
})
