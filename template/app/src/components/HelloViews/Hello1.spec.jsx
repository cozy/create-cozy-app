'use strict'
import React from 'react'
import { render } from '@testing-library/react'

import { Hello1 } from 'src/components/HelloViews/Hello1'
import AppLike from 'test/AppLike'

const setup = () => {
  return render(
    <AppLike>
      <Hello1 />
    </AppLike>
  )
}

describe('Hello1 component:', () => {
  it('Hello1 should be rendered correctly', () => {
    const { container, getByText } = setup()
    expect(container).toBeDefined()
    expect(getByText('Just... Hello world! This is a first hello view'))
  })
})
