'use strict'

/* eslint-env jest */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// we import the not connected component version for testing
import { Todos } from 'components/Todos'

// mock data for testing
import mockTodos from './_mocksTodos.json'

Enzyme.configure({ adapter: new Adapter() })

describe('Todos component:', () => {
  it('should be rendered correctly without todos', () => {
    const component = shallow(<Todos data={[]} />).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should be rendered correctly with todos', () => {
    const component = shallow(
      <Todos data={mockTodos} fetchStatus="loaded" />
    ).getElement()
    expect(component).toMatchSnapshot()
  })

  it('should render a spinner if loading', () => {
    const component = shallow(
      <Todos data={[]} fetchStatus="loading" />
    ).getElement()
    expect(component).toMatchSnapshot()
  })
})
