'use strict'

/* eslint-env jest */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// we import the not connected component version for testing
import { Todo } from 'components/Todos/Todo'

// mock data for testing
import mockTodos from './_mocksTodos.json'

Enzyme.configure({ adapter: new Adapter() })

// async mock function
const mockUpdateTodo = jest.fn(() => Promise.resolve())
const todo = mockTodos[0]

describe('Todo component:', () => {
  it('should be rendered correctly', () => {
    const component = shallow(
      <Todo updateTodo={mockUpdateTodo} todo={todo} />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should handle isWorking correctly (display spinner)', () => {
    const component = shallow(<Todo updateTodo={mockUpdateTodo} todo={todo} />)
    expect(component.state().isWorking).toBe(false)
    component.setState({ isWorking: true })
    expect(component).toMatchSnapshot()
  })
})
