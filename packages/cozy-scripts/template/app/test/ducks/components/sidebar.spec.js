'use strict'

/* eslint-env jest */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { mockT } from '../../lib/I18n'
import { Sidebar } from '../../../src/components/Sidebar'

Enzyme.configure({ adapter: new Adapter() })

describe('Sidebar component', () => {
  it('should be rendered correctly', () => {
    const component = shallow(<Sidebar t={mockT} />).getElement()
    expect(component).toMatchSnapshot()
  })
})
