import React, { useState } from 'react'
import cx from 'classnames'

import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { useClient } from 'cozy-client'
import Input from 'cozy-ui/transpiled/react/Input'
import Label from 'cozy-ui/transpiled/react/Label'
import Button from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'

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
      <Typography variant={'h3'} className={'u-mt-2 u-mb-1'}>
        {t('todoAdd.title')}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="todo-add-input">{t('todoAdd.label')}</Label>
        <Input value={todoToAdd} onChange={handleChange} id="todo-add-input" />
        <Button
          type="submit"
          busy={isWorking}
          label={t('todoAdd.button.label')}
          size="large"
          extension={isMobile ? 'full' : 'narrow'}
          className={cx({ 'u-mt-half': isMobile })}
        />
      </form>
    </>
  )
}

export default TodoAdd
