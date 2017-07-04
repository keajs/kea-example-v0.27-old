import { PropTypes } from 'react'
import { createLogic } from 'kea/logic'

export default createLogic({
  // PATH
  path: () => ['scenes', 'homepage', 'index'],

  // CONSTANTS
  // constants: () => [
  //   'SOMETHING'
  // ],
  //

  // ACTIONS
  actions: ({ constants }) => ({
    updateName: name => ({ name })
  }),

  // REDUCERS
  reducers: ({ actions, constants }) => ({
    name: ['Chirpy', PropTypes.string, {
      [actions.updateName]: (state, payload) => payload.name
    }]
  }),

  // SELECTORS
  selectors: ({ constants, selectors }) => ({
    capitalizedName: [
      () => [selectors.name],
      (name) => {
        return name.trim().split(' ').map(k => `${k.charAt(0).toUpperCase()}${k.slice(1).toLowerCase()}`).join(' ')
      },
      PropTypes.string
    ]
  })
})
