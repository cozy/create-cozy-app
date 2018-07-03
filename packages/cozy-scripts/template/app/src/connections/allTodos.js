import { connect, withMutations } from 'cozy-client'

const DOCTYPE = 'io.mocks.todos'
const CONNECTION_NAME = 'allTodos'

// Provides the client state data to the provided component
export const withTodos = component =>
  connect(
    client => client.all(DOCTYPE).UNSAFE_noLimit(),
    {
      as: CONNECTION_NAME
    }
  )(component)

// Provides the client mutations methods to the provided component
export const withTodosMutations = component =>
  withMutations(client => ({
    createTodo: attributes =>
      client.create(DOCTYPE, attributes, null, {
        // update the current app data
        updateQueries: {
          [CONNECTION_NAME]: (previousData, result) =>
            previousData.concat([result.data])
        }
      }),
    updateTodo: todo => client.save(todo),
    deleteTodo: todo =>
      client.destroy(todo, {
        // update the current app data
        updateQueries: {
          [CONNECTION_NAME]: (previousData, result) => {
            return previousData.filter(d => d._id !== result.data._id)
          }
        }
      })
  }))(component)
