import React, { useState } from 'react'

import { useClient } from 'cozy-client'
import Input from 'cozy-ui/transpiled/react/Input'
import Label from 'cozy-ui/transpiled/react/Label'
import Button from 'cozy-ui/transpiled/react/Button'

import { TODOS_DOCTYPE } from '../../../doctypes'

export const TodoAdd = () => {
  const client = useClient()
  const [todoToAdd, setTodoToAdd] = useState('')
  const [isWorking, setIsWorking] = useState(false)

  const handleChange = event => {
    setTodoToAdd(event.target.value)
  }

  const handleSubmit = async () => {
    // reset the input and display a spinner during the process
    setIsWorking(true)
    setTodoToAdd('')
    await client.save({ _type: TODOS_DOCTYPE, name: todoToAdd })
    setIsWorking(false)
  }

  return (
    <div>
      <h2>Add a new Todo:</h2>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="todo-add-input"> Todo name: </Label>
        <Input value={todoToAdd} onChange={handleChange} id="todo-add-input" />
        <Button
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

export default TodoAdd
