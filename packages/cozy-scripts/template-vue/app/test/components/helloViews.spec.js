'use strict'

/* eslint-env jest */

import Vue from 'vue'
import { shallow } from '@vue/test-utils'

import Hello1 from '../../src/components/HelloViews/Hello1'
import Hello2 from '../../src/components/HelloViews/Hello2'
import Hello3 from '../../src/components/HelloViews/Hello3'
import I18nTestMixin from '../lib/I18n'
Vue.mixin(I18nTestMixin)

describe('Hello components:', () => {
  it('Hello1 should be rendered correctly', () => {
    const component = shallow(Hello1)
    expect(component.html()).toMatchSnapshot()
  })
  it('Hello2 should be rendered correctly', () => {
    const component = shallow(Hello2)
    expect(component.html()).toMatchSnapshot()
  })
  it('Hello3 should be rendered correctly', () => {
    const component = shallow(Hello3)
    expect(component.html()).toMatchSnapshot()
  })
})
