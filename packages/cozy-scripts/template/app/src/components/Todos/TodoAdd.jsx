import React, { Component } from 'react'

import { withClient } from 'cozy-client'
import Input from 'cozy-ui/react/Input'
import Label from 'cozy-ui/react/Label'
import Button from 'cozy-ui/react/Button'

import { TODOS_DOCTYPE } from 'doctypes'

export class TodoAdd extends Component {
  constructor(props, context) {
    super(props, context)
    // initial component state
    this.state = {
      todoToAdd: '',
      isWorking: false
    }
  }

  // handle input value change
  handleChange = event => {
    this.setState({ todoToAdd: event.target.value })
  }

  // create the new todo
  handleSubmit = async () => {
    const { todoToAdd } = this.state
    const { client } = this.props
    // reset the input and display a spinner during the process
    this.setState({ todoToAdd: '' })

    try {
      this.setState({ isWorking: true })
      const newDoc = { _type: TODOS_DOCTYPE, name: todoToAdd }
      await client.save(newDoc)
    } finally {
      this.setState(() => ({ isWorking: false }))
    }
  }

  render() {
    const { todoToAdd, isWorking } = this.state
    return (
      <div>
        <h2 className="u-mt-2 u-mb-half">Add a new Todo</h2>
        <form onSubmit={this.handleSubmit}>
          <Label htmlFor="todo-add-input">Todo name</Label>
          <Input
            value={todoToAdd}
            onChange={this.handleChange}
            id="todo-add-input"
          />
          <Button
            onClick={this.submit}
            type="submit"
            busy={isWorking}
            label="add"
            size="large"
            extension="narrow"
          />
        </form>
      </div>
    )
  }
}

// get mutations from the client to use createDocument
export default withClient(TodoAdd)
