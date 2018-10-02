import React, { Component } from 'react'

import { withMutations } from 'cozy-client'
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
    const { createDocument } = this.props
    // reset the input and display a spinner during the process
    this.setState(() => ({ todoToAdd: '', isWorking: true }))
    await createDocument(TODOS_DOCTYPE, { name: todoToAdd })
    // remove the spinner
    this.setState(() => ({ isWorking: false }))
  }

  render() {
    const { todoToAdd, isWorking } = this.state
    return (
      <div>
        <h2>Add a new Todo:</h2>
        <form onSubmit={this.handleSubmit}>
          <Label htmlFor="todo-add-input"> Todo name: </Label>
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
export default withMutations()(TodoAdd)
