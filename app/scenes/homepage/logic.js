import { PropTypes } from 'react'
import { createAction } from 'redux-act'
import Logic, { createMapping } from 'kea-logic'

// import mirrorCreator from 'mirror-creator'

class SceneLogic extends Logic {
  constructor () {
    super()
    this.init()
  }

  // PATH
  path = () => ['scenes', 'homepage', 'index']

  // CONSTANTS
  // constants = () => mirrorCreator([
  // ])
  //

  // ACTIONS
  actions = ({ constants }) => ({
    updateName: createAction('change the name of the bird', (name) => ({ name }))
  })

  // REDUCER
  structure = ({ actions, constants }) => ({
    name: createMapping({
      [actions.updateName]: (state, payload) => {
        return payload.name
      }
    }, 'Chirpy', PropTypes.string)
  })

  // SELECTORS
  selectors = ({ path, structure, constants, selectors, addSelector }) => {
    addSelector('capitalizedName', PropTypes.string, [
      selectors.name
    ], (name) => {
      return name.trim().split(' ').map(k => `${k.charAt(0).toUpperCase()}${k.slice(1).toLowerCase()}`).join(' ')
    })
  }
}

export default new SceneLogic()
