import { PropTypes } from 'react'
import Logic, { createMapping } from 'kea/logic'

// import mirrorCreator from 'mirror-creator'

class SceneLogic extends Logic {
  // PATH
  path = () => ['scenes', 'homepage', 'index']

  // CONSTANTS
  // constants = () => mirrorCreator([
  // ])
  //

  // ACTIONS
  actions = ({ constants }) => ({
    updateName: name => ({ name })
  })

  // STRUCTURE
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

export default new SceneLogic().init()
