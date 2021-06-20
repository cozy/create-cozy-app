import React, { useState } from 'react'

import { useClient } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Button'

export const TodoRemoveButton = ({ todo }) => {
  const client = useClient()
  const [isWorking, setIsWorking] = useState(false)

  const removeTodo = async () => {
    // display a spinner during the process
    setIsWorking(true)
    // delete the todo in the Cozy : asynchronous
    await client.destroy(todo)
    // remove the spinner
    // setIsWorking(false)
    // We can omit that since this component will be
    // unmount after the document is deleted by the client
  }

  return (
    <Button
      className="todo-remove-button"
      theme="danger"
      icon="delete"
      iconOnly
      label="Delete"
      busy={isWorking}
      disabled={isWorking}
      onClick={removeTodo}
      extension="narrow"
    />
  )
}

export default TodoRemoveButton
