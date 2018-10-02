'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

// we import the not connected component version for testing
import { TodoAdd } from 'components/Todos/TodoAdd'
import { TODOS_DOCTYPE } from 'doctypes'
// import Button from 'cozy-ui/react/Button'
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

  it('should be rendered correctly', () => {
    const component = shallow(
      <TodoAdd createDocument={mockCreateTodo} />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should handle isWorking correctly (display spinner)', () => {
    const component = shallow(<TodoAdd createDocument={mockCreateTodo} />)

    expect(component.state().isWorking).toBe(false)
    component.setState({ isWorking: true })
    expect(component).toMatchSnapshot()
  })

  it('should handle createDocument correctly on button click', async () => {
    const component = shallow(<TodoAdd createDocument={mockCreateTodo} />)
    // set a todo name value
    component.setState({ todoToAdd: created.name })

    const addButton = component.find('form')
    await addButton.simulate('submit')

    expect(mockCreateTodo.mock.calls.length).toBe(1)
    expect(mockCreateTodo.mock.calls[0][0]).toEqual(TODOS_DOCTYPE)
    expect(mockCreateTodo.mock.calls[0][1]).toEqual({ name: created.name })
  })

  it('should update the state on input value change', () => {
    const component = shallow(<TodoAdd createDocument={mockCreateTodo} />)
    const input = component.find(Input)

    expect(component.state().todoToAdd).toBe('')
    input.simulate('change', { target: { value: created.name } })
    expect(component.state().todoToAdd).toBe(created.name)
  })
})
