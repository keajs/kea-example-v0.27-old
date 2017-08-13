import { kea } from 'kea'
import PropTypes from 'prop-types'

import createUuid from '~/utils/create-uuid'

export default kea({
  path: () => ['scenes', 'todos', 'index'],

  actions: ({ constants }) => ({
    addTodo: value => ({ value }),
    removeTodo: id => ({ id }),
    completeTodo: id => ({ id }),
    unCompleteTodo: id => ({ id }),
    renameTodo: (id, value) => ({ id, value }),
    setEditing: id => ({ id }),
    updateEditValue: (id, value) => ({ id, value }),
    clearEditing: id => ({ id }),
    toggleAll: completed => ({ completed }),
    clearCompleted: true
  }),

  reducers: ({ actions, constants }) => ({
    todos: [{}, PropTypes.object, { persist: true }, {
      [actions.addTodo]: (state, payload) => {
        const { value } = payload
        const id = createUuid()

        return {
          ...state,
          [id]: {
            id,
            createdAt: new Date().getTime(),
            value,
            completed: false,
            editing: false
          }
        }
      },
      [actions.removeTodo]: (state, payload) => {
        const { id } = payload
        const { [id]: _dispose_, ...rest } = state
        return rest
      },
      [actions.completeTodo]: (state, payload) => {
        const { id } = payload

        return {
          ...state,
          [id]: {
            ...state[id],
            completed: true
          }
        }
      },
      [actions.unCompleteTodo]: (state, payload) => {
        const { id } = payload

        return {
          ...state,
          [id]: {
            ...state[id],
            completed: false
          }
        }
      },
      [actions.renameTodo]: (state, payload) => {
        const { id, value } = payload

        return {
          ...state,
          [id]: {
            ...state[id],
            value
          }
        }
      },
      [actions.toggleAll]: (state, payload) => {
        const { completed } = payload
        let newState = {}
        Object.values(state).forEach(todo => {
          newState[todo.id] = {...todo, completed}
        })

        return newState
      },
      [actions.clearCompleted]: (state, payload) => {
        let newState = {}
        Object.values(state).forEach(todo => {
          if (!todo.completed) {
            newState[todo.id] = todo
          }
        })
        return newState
      },
      [actions.setEditing]: (state, payload) => {
        const { id } = payload

        return {
          ...state,
          [id]: {
            ...state[id],
            editing: true,
            editValue: state[id].value
          }
        }
      },
      [actions.updateEditValue]: (state, payload) => {
        const { id, value } = payload

        return {
          ...state,
          [id]: {
            ...state[id],
            editValue: value
          }
        }
      },
      [actions.clearEditing]: (state, payload) => {
        const { id } = payload

        return {
          ...state,
          [id]: {
            ...state[id],
            editing: false,
            editValue: null
          }
        }
      }
    }]
  }),

  // SELECTORS (data from reducer + more)
  selectors: ({ constants, selectors }) => ({
    allTodos: [
      () => [selectors.todos],
      (todos) => Object.values(todos),
      PropTypes.array
    ],

    activeTodos: [
      () => [selectors.allTodos],
      (allTodos) => allTodos.filter(todo => !todo.completed),
      PropTypes.array
    ],

    completedTodos: [
      () => [selectors.allTodos],
      (allTodos) => allTodos.filter(todo => todo.completed),
      PropTypes.array
    ]
  })
})
