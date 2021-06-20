'use strict'

/* eslint-env jest */

import React from 'react'
import { render } from '@testing-library/react'
import { Sidebar } from 'components/Sidebar'
import AppLike from '../AppLike'

describe('Sidebar component', () => {
  it('should be rendered correctly', () => {
    const { container } = render(
      <AppLike>
        <Sidebar />
      </AppLike>
    )
    expect(container).toMatchSnapshot()
  })
})
