'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

// we import the not connected component version for testing
import { Todos } from 'components/Todos'

// mock data for testing
import mockTodos from './_mocksTodos.json'

const getProps = (todos = [], fetchStatus = 'loaded') => ({
  todos: {
    data: todos,
    fetchStatus
  }
})

describe('Todos component:', () => {
  it('should be rendered correctly without todos', () => {
    const component = shallow(<Todos {...getProps()} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should be rendered correctly with todos', () => {
    const component = shallow(<Todos {...getProps(mockTodos)} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should render a spinner if loading', () => {
    const component = shallow(
      <Todos {...getProps(mockTodos, 'loading')} />
    ).getElement()
    expect(component).toMatchSnapshot()
  })
})
