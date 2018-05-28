import React, { Component } from 'react'

import Input from 'cozy-ui/react/Input'
import Label from 'cozy-ui/react/Label'
import Button from 'cozy-ui/react/Button'
import { withTodosMutations } from 'connections/allTodos'

export class TodoAdd extends Component {
  constructor(props) {
    super(props)
    // initial component state
    this.state = {
      todoToAdd: '',
      isWorking: false
    }
  }

  // handle input value change
  handleChange = e => {
    this.setState(() => ({ todoToAdd: e.target.value }))
  }

  // handle update on Enter key
  handleEnterKey = e => {
    if (e.keyCode === 13) this.submit()
  }

  // create the new todo
  submit = async () => {
    const { todoToAdd } = this.state
    const { createTodo } = this.props
    // reset the input and display a spinner during the process
    this.setState(() => ({ todoToAdd: '', isWorking: true }))
    await createTodo({ name: todoToAdd })
    // remove the spinner
    this.setState(() => ({ isWorking: false }))
  }

  render() {
    const { todoToAdd, isWorking } = this.state
    return (
      <div>
        <h2>Add a new Todo:</h2>
        <Label> Todo name: </Label>
        <Input
          value={todoToAdd}
          onChange={this.handleChange}
          onKeyUp={this.handleEnterKey}
        />
        <Button
          onClick={this.submit}
          busy={isWorking}
          label="add"
          size="large"
          extension="narrow"
        />
      </div>
    )
  }
}

// get mutations from the client to use createTodo
export default withTodosMutations(TodoAdd)
