import React, { useState } from 'react'

import { useClient } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Icon from 'cozy-ui/transpiled/react/Icon'

export const TodoRemoveButton = ({ todo }) => {
  const { t } = useI18n()
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
      color="error"
      label={<Icon icon="trash" />}
      title={t('todoRemoveButton.label')}
      busy={isWorking}
      disabled={isWorking}
      onClick={removeTodo}
      data-testid="submit-btn"
    />
  )
}

export default TodoRemoveButton
