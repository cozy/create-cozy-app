import React, { useState } from 'react'

import { useClient } from 'cozy-client'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import OutlinedInput from 'cozy-ui/transpiled/react/OutlinedInput'
import Button from 'cozy-ui/transpiled/react/Buttons'
import InputAdornment from 'cozy-ui/transpiled/react/InputAdornment'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Box from 'cozy-ui/transpiled/react/Box'

import { TODOS_DOCTYPE } from 'src/doctypes'

export const TodoAdd = () => {
  const { t } = useI18n()
  const { isMobile } = useBreakpoints()
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
    <>
      <Typography variant="h3" className="u-mt-2 u-mb-1">
        {t('todoAdd.title')}
      </Typography>
      <Box maxWidth="30rem" {...(!isMobile && { pl: '2rem' })}>
        <OutlinedInput
          value={todoToAdd}
          fullWidth
          onChange={handleChange}
          inputProps={{
            'data-testid': 'todo-add-input'
          }}
          endAdornment={
            <InputAdornment position="end">
              <Button
                busy={isWorking}
                label={t('todoAdd.button.label')}
                onClick={handleSubmit}
                data-testid="submit-btn"
              />
            </InputAdornment>
          }
        />
      </Box>
    </>
  )
}

export default TodoAdd
