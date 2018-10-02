import { TODOS_DOCTYPE } from './todos'

// the documents schema, necessary for CozyClient
export default {
  todos: {
    doctype: TODOS_DOCTYPE,
    attributes: {},
    relationships: {}
  }
}

// export all doctypes for the application
export * from './todos'
