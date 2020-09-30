/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { TodoRemoveButton } from 'components/Todos/TodoRemoveButton'
import Button from 'cozy-ui/react/Button'

import mockTodos from './_mocksTodos.json'

const todo = mockTodos[0]

describe('TodoRemoveButton component:', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  const setup = () => {
    const client = { destroy: jest.fn().mockResolvedValue({}) }
    const component = shallow(<TodoRemoveButton todo={todo} client={client} />)
    return { component, client }
  }

  it('should be rendered correctly', () => {
    const { component } = setup()
    expect(component.getElement()).toMatchSnapshot()
  })

  it('should handle isWorking correctly (display spinner)', () => {
    const { component } = setup()
    expect(component.state().isWorking).toBe(false)
    component.setState({ isWorking: true })
    expect(component.getElement()).toMatchSnapshot()
  })

  it('should handle removeTodo correctly on button click', async () => {
    const { component, client } = setup()
    const removeButton = component.find(Button)
    await removeButton.simulate('click')
    expect(client.destroy.mock.calls.length).toBe(1)
    expect(client.destroy.mock.calls[0][0]).toBe(todo)
  })
})
