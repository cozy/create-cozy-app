import React, { Component } from 'react'

import Button from 'cozy-ui/react/Button'
import Icon from 'cozy-ui/react/Icon'
import { withClient } from 'cozy-client'

export class TodoRemoveButton extends Component {
  constructor(props) {
    super(props)
    // initial component state
    this.state = { isWorking: false }
  }

  // delete the related todo
  removeTodo = async () => {
    const { client, todo } = this.props
    this.setState({ isWorking: true })

    try {
      await client.destroy(todo)
    } finally {
      this.setState({ isWorking: false })
    }
  }

  render() {
    const { isWorking } = this.state
    return (
      <Button
        className="todo-remove-button"
        theme="danger"
        iconOnly
        label="Delete"
        busy={isWorking}
        disabled={isWorking}
        onClick={this.removeTodo}
        extension="narrow"
      >
        {!isWorking ? <Icon icon="trash" /> : null}
      </Button>
    )
  }
}

// get mutations from the client to use deleteDocument
export default withClient(TodoRemoveButton)
