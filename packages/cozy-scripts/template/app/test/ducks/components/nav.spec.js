'use strict'

/* eslint-env jest */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { mockT } from '../../lib/I18n'
import { Nav } from '../../../src/ducks/components/Nav'

Enzyme.configure({ adapter: new Adapter() })

describe('Nav component', () => {
  it('should be rendered correctly', () => {
    const component = shallow(
      <Nav t={mockT} />
    ).getElement()
    expect(component).toMatchSnapshot()
  })
})
