import { Q } from 'cozy-client'

export const TODOS_DOCTYPE = 'io.mocks.todos'

export const getAllTodos = {
  definition: () => Q(TODOS_DOCTYPE),
  options: {
    as: `todos`
  }
}
