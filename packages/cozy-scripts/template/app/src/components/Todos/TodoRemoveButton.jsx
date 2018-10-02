import React, { Component } from 'react'

import Button from 'cozy-ui/react/Button'
import { withMutations } from 'cozy-client'

export class TodoRemoveButton extends Component {
  constructor(props) {
    super(props)
    // initial component state
    this.state = { isWorking: false }
  }

  // delete the related todo
  removeTodo = async () => {
    const { deleteDocument, todo } = this.props
    // display a spinner during the process
    this.setState(() => ({ isWorking: true }))
    // delete the todo in the Cozy : asynchronous
    await deleteDocument(todo)
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
        iconOnly
        label="Delete"
        busy={isWorking}
        disabled={isWorking}
        onClick={this.removeTodo}
        extension="narrow"
      />
    )
  }
}

// get mutations from the client to use deleteDocument
export default withMutations()(TodoRemoveButton)
