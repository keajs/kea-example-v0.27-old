import { PropTypes } from 'react'
import Logic, { createMapping } from 'kea-logic'
import mirrorCreator from 'mirror-creator'

import createUuid from '~/utils/create-uuid'

class TodosLogic extends Logic {
  // PATH
  path = () => ['scenes', 'todos', 'index']

  // CONSTANTS
  constants = () => mirrorCreator([
    'SHOW_ALL',
    'SHOW_ACTIVE',
    'SHOW_COMPLETED'
  ])

  // ACTIONS
  actions = ({ constants }) => ({
    // tab
    showAll: true,
    showActive: true,
    showCompleted: true,

    // todos
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
  })

  // STRUCTURE
  structure = ({ actions, constants }) => ({
    visibilityFilter: createMapping({
      [actions.showAll]: () => constants.SHOW_ALL,
      [actions.showActive]: () => constants.SHOW_ACTIVE,
      [actions.showCompleted]: () => constants.SHOW_COMPLETED
    }, constants.SHOW_ALL, PropTypes.string),

    todos: createMapping({
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
    }, {}, PropTypes.object, { persist: true })
  })

  // SELECTORS (data from reducer + more)
  selectors = ({ path, structure, constants, selectors, addSelector }) => {
    addSelector('visibleTodos', PropTypes.array, [
      selectors.visibilityFilter,
      selectors.todos
    ], (visibilityFilter, todos) => do {
      if (visibilityFilter === constants.SHOW_ALL) {
        Object.values(todos)
      } else if (visibilityFilter === constants.SHOW_ACTIVE) {
        Object.values(todos).filter(todo => !todo.completed)
      } else if (visibilityFilter === constants.SHOW_COMPLETED) {
        Object.values(todos).filter(todo => todo.completed)
      }
    })

    addSelector('todoCount', PropTypes.number, [
      selectors.todos
    ], (todos) => do {
      Object.keys(todos).length
    })

    addSelector('activeTodoCount', PropTypes.number, [
      selectors.todos
    ], (todos) => do {
      Object.values(todos).filter(todo => !todo.completed).length
    })

    addSelector('completedTodoCount', PropTypes.number, [
      selectors.todos
    ], (todos) => do {
      Object.values(todos).filter(todo => todo.completed).length
    })
  }
}

export default new TodosLogic().init()
