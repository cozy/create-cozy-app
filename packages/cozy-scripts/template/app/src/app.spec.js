'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import App from '../src/components/App'

describe('App component only', () => {
  it('should be mounted correctly', () => {
    const component = shallow(<App />).getElement()
    expect(component).toMatchSnapshot()
  })
})
