'use strict'
import React from 'react'
import { render } from '@testing-library/react'

import { Hello2 } from './Hello2'
import AppLike from '../../../test/AppLike'

const setup = () => {
  return render(
    <AppLike>
      <Hello2 />
    </AppLike>
  )
}

describe('Hello2 component:', () => {
  it('Hello2 should be rendered correctly', () => {
    const { container, getByText } = setup()
    expect(container).toBeDefined()
    expect(getByText('Just... Hello world! This is a second hello view'))
  })
})
