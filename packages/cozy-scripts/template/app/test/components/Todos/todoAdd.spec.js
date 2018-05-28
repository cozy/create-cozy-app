'use strict'

/* eslint-env jest */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// we import the not connected component version for testing
import { TodoAdd } from 'components/Todos/TodoAdd'
import Button from 'cozy-ui/react/Button'
import Input from 'cozy-ui/react/Input'

// mock data for testing
import mockTodos from './_mocksTodos.json'

Enzyme.configure({ adapter: new Adapter() })

const created = mockTodos[0]
// async mock function
const mockCreateTodo = jest.fn(() => Promise.resolve(created))

describe('TodoAdd component:', () => {
  it('should be rendered correctly', () => {
    const component = shallow(
      <TodoAdd createTodo={mockCreateTodo} />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should handle isWorking correctly (display spinner)', () => {
    const component = shallow(<TodoAdd createTodo={mockCreateTodo} />)
    expect(component.state().isWorking).toBe(false)
    component.setState({ isWorking: true })
    expect(component).toMatchSnapshot()
  })

  it('should handle createTodo correctly on button click', async () => {
    const component = shallow(<TodoAdd createTodo={mockCreateTodo} />)
    // set a todo name value
    component.setState({ todoToAdd: created.name })
    const addButton = component.find(Button)
    await addButton.simulate('click')
    expect(mockCreateTodo.mock.calls.length).toBe(1)
    expect(mockCreateTodo.mock.calls[0][0]).toEqual({ name: created.name })
  })

  it('should update the state on input value change', () => {
    const component = shallow(<TodoAdd createTodo={mockCreateTodo} />)
    const input = component.find(Input)
    expect(component.state().todoToAdd).toBe('')
    input.simulate('change', { target: { value: created.name } })
    expect(component.state().todoToAdd).toBe(created.name)
  })

  it('should handle createTodo on Enter key', async () => {
    const component = shallow(<TodoAdd createTodo={mockCreateTodo} />)
    const input = component.find(Input)
    await input.simulate('keyup', { keyCode: 13 })
    expect(mockCreateTodo.mock.calls.length).toBe(2)
    expect(mockCreateTodo.mock.calls[0][0]).toEqual({ name: created.name })
    // an other key should not trigger the creation
    await input.simulate('keyup', { keyCode: 10 })
    expect(mockCreateTodo.mock.calls.length).toBe(2)
  })
})
