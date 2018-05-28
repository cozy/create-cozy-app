import React, { Component } from 'react'

import Button from 'cozy-ui/react/Button'
import { withTodosMutations } from 'connections/allTodos'

export class TodoRemoveButton extends Component {
  constructor(props) {
    super(props)
    // initial component state
    this.state = { isWorking: false }
  }

  // delete the related todo
  removeTodo = async () => {
    const { deleteTodo, todo } = this.props
    // display a spinner during the process
    this.setState(() => ({ isWorking: true }))
    // delete the todo in the Cozy : asynchronous
    await deleteTodo(todo)
    // remove the spinner
    this.setState(() => ({ isWorking: false }))
  }

  render() {
    const { isWorking } = this.state
    return (
      <Button
        className="todo-remove-button"
        theme="danger"
        icon="delete"
        busy={isWorking}
        disabled={isWorking}
        onClick={this.removeTodo}
        extension="narrow"
      />
    )
  }
}

// get mutations from the client to use deleteTodo
export default withTodosMutations(TodoRemoveButton)
