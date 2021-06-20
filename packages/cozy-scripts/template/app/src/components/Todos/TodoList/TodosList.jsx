import React from 'react'

import TodoRemoveButton from '../TodoRemoveButton/TodoRemoveButton'

export const TodosList = ({ todos }) => {
  if (!todos || !todos.length) return null

  return (
    <div>
      <h2>Todos list:</h2>
      <ul className="todos-list">
        {todos.map(todo => (
          <li key={todo._id} className="todo-item">
            <span>{todo.name}</span>
            <TodoRemoveButton todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodosList
