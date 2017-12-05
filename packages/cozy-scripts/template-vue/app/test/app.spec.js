'use strict'

/* eslint-env jest */

import Vue from 'vue'
import { shallow } from 'vue-test-utils'

import App from '../src/components/App'
import I18nTestMixin from './lib/I18n'
Vue.mixin(I18nTestMixin)

describe('App component only', () => {
  it('should be mounted correctly', () => {
    const component = shallow(App)
    expect(component.html()).toMatchSnapshot()
  })
})
