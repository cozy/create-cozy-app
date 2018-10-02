'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

// we import the not connected component version for testing
import { TodosList } from 'components/Todos/TodosList'

// mock data for testing
import mockTodos from './_mocksTodos.json'

describe('TodosList component:', () => {
  it('should be rendered correctly without todos', () => {
    const component = shallow(<TodosList todos={[]} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should be rendered correctly with todos', () => {
    const component = shallow(<TodosList todos={mockTodos} />).getElement()
    expect(component).toMatchSnapshot()
  })
})
