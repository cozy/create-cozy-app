export const TODOS_DOCTYPE = 'io.mocks.todos'

// queries for CozyClient

export const todosQuery = client => client.find(TODOS_DOCTYPE)
