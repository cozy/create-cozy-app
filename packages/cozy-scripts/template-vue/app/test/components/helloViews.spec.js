'use strict'

/* eslint-env jest */

import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'

import Hello1 from '../../src/components/HelloViews/Hello1'
import Hello2 from '../../src/components/HelloViews/Hello2'
import Hello3 from '../../src/components/HelloViews/Hello3'
import I18nTestMixin from '../lib/I18n'
Vue.mixin(I18nTestMixin)

describe('Hello components:', () => {
  it('Hello1 should be rendered correctly', () => {
    const component = shallowMount(Hello1)
    expect(component.html()).toMatchSnapshot()
  })
  it('Hello2 should be rendered correctly', () => {
    const component = shallowMount(Hello2)
    expect(component.html()).toMatchSnapshot()
  })
  it('Hello3 should be rendered correctly', () => {
    const component = shallowMount(Hello3)
    expect(component.html()).toMatchSnapshot()
  })
})
