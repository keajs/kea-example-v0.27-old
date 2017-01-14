import { PropTypes } from 'react'
import Logic, { initLogic } from 'kea/logic'

@initLogic
export default class HomepageLogic extends Logic {
  // PATH
  path = () => ['scenes', 'homepage', 'index']

  // CONSTANTS
  // constants = () => [
  //   'SOMETHING'
  // ]
  //

  // ACTIONS
  actions = ({ constants }) => ({
    updateName: name => ({ name })
  })

  // REDUCERS
  reducers = ({ actions, constants }) => ({
    name: ['Chirpy', PropTypes.string, {
      [actions.updateName]: (state, payload) => payload.name
    }]
  })

  // SELECTORS
  selectors = ({ constants, selectors }) => ({
    capitalizedName: [
      () => [ selectors.name ],
      (name) => name.trim().split(' ').map(k => `${k.charAt(0).toUpperCase()}${k.slice(1).toLowerCase()}`).join(' '),
      PropTypes.string
    ]
  })
}
