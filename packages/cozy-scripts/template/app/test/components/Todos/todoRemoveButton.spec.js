'use strict'

/* eslint-env jest */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// we import the not connected component version for testing
import { TodoRemoveButton } from 'components/Todos/TodoRemoveButton'
import Button from 'cozy-ui/react/Button'

// mock data for testing
import mockTodos from './_mocksTodos.json'

Enzyme.configure({ adapter: new Adapter() })

// async mock function
const mockDeleteTodo = jest.fn(() => Promise.resolve())
const todo = mockTodos[0]

describe('TodoRemoveButton component:', () => {
  it('should be rendered correctly', () => {
    const component = shallow(
      <TodoRemoveButton todo={todo} deleteTodo={mockDeleteTodo} />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should handle isWorking correctly (display spinner)', () => {
    const component = shallow(
      <TodoRemoveButton todo={todo} deleteTodo={mockDeleteTodo} />
    )
    expect(component.state().isWorking).toBe(false)
    component.setState({ isWorking: true })
    expect(component).toMatchSnapshot()
  })

  it('should handle removeTodo correctly on button click', async () => {
    const component = shallow(
      <TodoRemoveButton todo={todo} deleteTodo={mockDeleteTodo} />
    )
    const removeButton = component.find(Button)
    await removeButton.simulate('click')
    expect(mockDeleteTodo.mock.calls.length).toBe(1)
    expect(mockDeleteTodo.mock.calls[0][0]).toBe(todo)
  })
})
