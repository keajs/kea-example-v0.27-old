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
    addTodo: createAction('add todo', todo => ({ todo })),
    removeTodo: createAction('remove todo', id => ({ id })),
    completeTodo: createAction('complete todo', id => ({ id })),
    unCompleteTodo: createAction('complete todo', id => ({ id })),
    renameTodo: createAction('rename todo', (id, todo) => ({ id, todo })),
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
        state.concat([{ id: createUuid(), todo: payload.todo, completed: false, editing: false }])
      },
      [actions.removeTodo]: (state, payload) => do {
        state.filter(todo => todo.id !== payload.id)
      },
      [actions.completeTodo]: (state, payload) => do {
        state.map(todo => do {
          if (todo.id === payload.id) {
            Object.assign({}, todo, { completed: true })
          } else {
            todo
          }
        })
      },
      [actions.unCompleteTodo]: (state, payload) => do {
        state.map(todo => do {
          if (todo.id === payload.id) {
            Object.assign({}, todo, { completed: false })
          } else {
            todo
          }
        })
      },
      [actions.renameTodo]: (state, payload) => do {
        state.map(todo => do {
          if (todo.id === payload.id) {
            Object.assign({}, todo, { todo: payload.todo })
          } else {
            todo
          }
        })
      },
      [actions.toggleAll]: (state, payload) => do {
        state.map(todo => do {
          Object.assign({}, todo, { completed: payload.completed })
        })
      },
      [actions.clearCompleted]: (state, payload) => do {
        state.filter(todo => !todo.completed)
      },
      [actions.setEditing]: (state, payload) => do {
        state.map(todo => todo.id === payload.id
          ? Object.assign({}, todo, { editing: true, editValue: todo.todo })
          : todo
        )
      },
      [actions.updateEditValue]: (state, payload) => do {
        state.map(todo => todo.id === payload.id
          ? Object.assign({}, todo, { editValue: payload.value })
          : todo
        )
      },
      [actions.clearEditing]: (state, payload) => do {
        state.map(todo => todo.id === payload.id
          ? Object.assign({}, todo, { editing: false, editValue: null })
          : todo
        )
      }
    }, [], PropTypes.array, { persist: true })
  })

  // SELECTORS (data from reducer + more)
  selectors = ({ path, structure, constants, selectors, addSelector }) => {
    addSelector('visibleTodos', PropTypes.array, [
      selectors.visibilityFilter,
      selectors.todos
    ], (visibilityFilter, todos) => do {
      if (visibilityFilter === constants.SHOW_ALL) {
        todos
      } else if (visibilityFilter === constants.SHOW_ACTIVE) {
        todos.filter(todo => !todo.completed)
      } else if (visibilityFilter === constants.SHOW_COMPLETED) {
        todos.filter(todo => todo.completed)
      }
    })

    addSelector('todoCount', PropTypes.number, [
      selectors.todos
    ], (todos) => do {
      todos.length
    })

    addSelector('activeTodoCount', PropTypes.number, [
      selectors.todos
    ], (todos) => do {
      todos.filter(todo => !todo.completed).length
    })

    addSelector('completedTodoCount', PropTypes.number, [
      selectors.todos
    ], (todos) => do {
      todos.filter(todo => todo.completed).length
    })
  }
}

export default new TodosLogic().init()
