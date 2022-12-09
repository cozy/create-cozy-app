import React from 'react'
import cx from 'classnames'

import { makeStyles } from 'cozy-ui/transpiled/react/styles'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Typography from 'cozy-ui/transpiled/react/Typography'

import TodoRemoveButton from 'src/components/Todos/TodoRemoveButton/TodoRemoveButton'

const useStyles = makeStyles({
  root: {
    backgroundColor: 'var(--defaultBackgroundColor)',
    borderRadius: '0.25rem',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    maxWidth: '30rem',
    paddingRight: '0.5rem'
  }
})

export const TodosList = ({ todos }) => {
  const { t } = useI18n()
  const classes = useStyles()
  const { isMobile } = useBreakpoints()

  if (!todos || todos?.length === 0) return null

  return (
    <>
      <Typography variant="h3" className="u-mv-1">
        {t('todoList.title')}
      </Typography>
      <List className={cx({ 'u-pl-0': isMobile, 'u-pl-2': !isMobile })}>
        {todos.map(todo => (
          <ListItem key={todo._id} classes={{ root: classes.root }}>
            <ListItemText primary={todo.name} />
            <TodoRemoveButton todo={todo} />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default TodosList
