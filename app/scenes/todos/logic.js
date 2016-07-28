import { PropTypes } from 'react'
import { createAction } from 'redux-act'
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
    showAll: createAction('show all todos', () => {}),
    showActive: createAction('show active todos', () => {}),
    showCompleted: createAction('show completed todos', () => {}),

    // todos
    addTodo: createAction('add todo', value => ({ value })),
    removeTodo: createAction('remove todo', id => ({ id })),
    completeTodo: createAction('complete todo', id => ({ id })),
    unCompleteTodo: createAction('complete todo', id => ({ id })),
    renameTodo: createAction('rename todo', (id, value) => ({ id, value })),
    setEditing: createAction('set as editing', (id) => ({ id })),
    updateEditValue: createAction('update edit value', (id, value) => ({ id, value })),
    clearEditing: createAction('unset editing', (id) => ({ id })),
    toggleAll: createAction('toggle all todos', (completed) => ({ completed })),
    clearCompleted: createAction('clear completed todos', () => {})
  })

  // STRUCTURE
  structure = ({ actions, constants }) => ({
    visibilityFilter: createMapping({
      [actions.showAll]: () => constants.SHOW_ALL,
      [actions.showActive]: () => constants.SHOW_ACTIVE,
      [actions.showCompleted]: () => constants.SHOW_COMPLETED
    }, constants.SHOW_ALL, PropTypes.string),

    todos: createMapping({
      [actions.addTodo]: (state, payload) => do {
        const { value } = payload
        const id = createUuid()
        const todo = {
          id,
          createdAt: new Date().getTime(),
          value,
          completed: false,
          editing: false
        }
        Object.assign({}, state, { [id]: todo })
      },
      [actions.removeTodo]: (state, payload) => do {
        const { id } = payload
        const { [id]: dispose, ...rest } = state
        rest
      },
      [actions.completeTodo]: (state, payload) => do {
        const { id } = payload

        Object.assign({}, state, {
          [id]: Object.assign({}, state[id], {
            completed: true
          })
        })
      },
      [actions.unCompleteTodo]: (state, payload) => do {
        const { id } = payload

        Object.assign({}, state, {
          [id]: Object.assign({}, state[id], {
            completed: false
          })
        })
      },
      [actions.renameTodo]: (state, payload) => do {
        const { id, value } = payload

        Object.assign({}, state, {
          [id]: Object.assign({}, state[id], {
            value
          })
        })
      },
      [actions.toggleAll]: (state, payload) => do {
        const { completed } = payload
        let newState = {}
        Object.values(state).forEach(todo => {
          newState[todo.id] = Object.assign({}, todo, {
            completed
          })
        })
        newState
      },
      [actions.clearCompleted]: (state, payload) => do {
        let newState = {}
        Object.values(state).forEach(todo => {
          if (!todo.completed) {
            newState[todo.id] = todo
          }
        })
        newState
      },
      [actions.setEditing]: (state, payload) => do {
        const { id } = payload

        Object.assign({}, state, {
          [id]: Object.assign({}, state[id], {
            editing: true,
            editValue: state[id].value
          })
        })
      },
      [actions.updateEditValue]: (state, payload) => do {
        const { id, value } = payload

        Object.assign({}, state, {
          [id]: Object.assign({}, state[id], {
            editValue: value
          })
        })
      },
      [actions.clearEditing]: (state, payload) => do {
        const { id } = payload

        Object.assign({}, state, {
          [id]: Object.assign({}, state[id], {
            editing: false,
            editValue: null
          })
        })
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
