import { combineReducers } from 'redux'
import { createAction, createReducer } from 'redux-act'
import { createSelector } from 'reselect'
import { createLogic, createSelectors } from 'kea-logic'
import mirrorCreator from 'mirror-creator'

import createUuid from '~/utils/create-uuid'

export const path = ['scenes', 'todos', 'index']

// CONSTANTS
export const constants = mirrorCreator([
  'SHOW_ALL',
  'SHOW_ACTIVE',
  'SHOW_COMPLETED'
])

// ACTIONS
export const actions = {
  // tab
  showAll: createAction('show all todos'),
  showActive: createAction('show active todos'),
  showCompleted: createAction('show completed todos'),

  // todos
  addTodo: createAction('add todo', todo => ({ todo })),
  removeTodo: createAction('remove todo', id => ({ id })),
  completeTodo: createAction('complete todo', id => ({ id })),
  unCompleteTodo: createAction('complete todo', id => ({ id })),
  renameTodo: createAction('rename todo', (id, todo) => ({ id, todo })),
  clearCompleted: createAction('clear completed todos')
}

// REDUCER
export const reducer = combineReducers({
  visibilityFilter: createReducer({
    [actions.showAll]: () => constants.SHOW_ALL,
    [actions.showActive]: () => constants.SHOW_ACTIVE,
    [actions.showCompleted]: () => constants.SHOW_COMPLETED
  }, constants.SHOW_ALL),

  todos: createReducer({
    [actions.addTodo]: (state, payload) => {
      return state.concat([{ id: createUuid(), todo: payload.todo, completed: false }])
    },
    [actions.removeTodo]: (state, payload) => {
      return state.filter(todo => todo.id !== payload.id)
    },
    [actions.completeTodo]: (state, payload) => {
      return state.map(todo => {
        if (todo.id === payload.id) {
          return Object.assign({}, todo, { completed: true })
        } else {
          return todo
        }
      })
    },
    [actions.unCompleteTodo]: (state, payload) => {
      return state.map(todo => {
        if (todo.id === payload.id) {
          return Object.assign({}, todo, { completed: false })
        } else {
          return todo
        }
      })
    },
    [actions.renameTodo]: (state, payload) => {
      return state.map(todo => {
        if (todo.id === payload.id) {
          return Object.assign({}, todo, { todo: payload.todo })
        } else {
          return todo
        }
      })
    },
    [actions.clearCompleted]: (state, payload) => {
      return state.filter(todo => !todo.completed)
    }
  }, [])
})

// SELECTORS
export const selectors = createSelectors(path, reducer)

selectors.visibleTodos = createSelector(
  selectors.visibilityFilter,
  selectors.todos,
  (visibilityFilter, todos) => {
    if (visibilityFilter === constants.SHOW_ALL) {
      return todos
    } else if (visibilityFilter === constants.SHOW_ACTIVE) {
      return todos.filter(todo => !todo.completed)
    } else if (visibilityFilter === constants.SHOW_COMPLETED) {
      return todos.filter(todo => todo.completed)
    }
  }
)

selectors.todoCount = createSelector(
  selectors.todos,
  (todos) => {
    return todos.length
  }
)

selectors.activeTodoCount = createSelector(
  selectors.todos,
  (todos) => {
    return todos.filter(todo => !todo.completed).length
  }
)

selectors.completedTodoCount = createSelector(
  selectors.todos,
  (todos) => {
    return todos.filter(todo => todo.completed).length
  }
)

export default createLogic({
  path,
  constants,
  actions,
  reducer,
  selectors
})
