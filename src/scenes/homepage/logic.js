import { combineReducers } from 'redux'
import { createAction, createReducer } from 'redux-act'
import { createSelector } from 'reselect'
import { createLogic, createSelectors } from 'kea-logic'
import mirrorCreator from 'mirror-creator'

export const path = ['scenes', 'homepage', 'index']

// CONSTANTS
export const constants = mirrorCreator([
])

// ACTIONS
export const actions = {
  updateName: createAction('change the name of the bird', (name) => ({ name }))
}

// REDUCER
export const reducer = combineReducers({
  name: createReducer({
    [actions.updateName]: (state, payload) => {
      return payload.name
    }
  }, 'chirpy')
})

// SELECTORS
export const selectors = createSelectors(path, reducer)

selectors.capitalizedName = createSelector(
  selectors.name,
  (name) => {
    return name.trim().split(' ').map(k => `${k.charAt(0).toUpperCase()}${k.slice(1).toLowerCase()}`).join(' ')
  }
)

export default createLogic({
  path,
  constants,
  actions,
  reducer,
  selectors
})
