import { combineReducers } from 'redux'
import { createAction, createReducer } from 'redux-act'
import { createSelector } from 'reselect'
import { createLogic, createSelectors } from 'kea-logic'
// import mirrorCreator from 'mirror-creator'

export const path = ['scenes', 'homepage', 'slider']

// CONSTANTS
// export const constants = mirrorCreator([
// ])
//
export const images = [
  {
    src: require('./_assets/kea1.jpg'),
    url: 'https://www.flickr.com/photos/kevinglisson/5855716978',
    author: 'Kevin Glisson'
  },
  {
    src: require('./_assets/kea2.jpg'),
    url: 'https://www.flickr.com/photos/geoftheref/9770370326/',
    author: 'Geof Wilson'
  },
  {
    src: require('./_assets/kea3.jpg'),
    url: 'https://www.flickr.com/photos/apertureeffect/20391690360',
    author: 'Rafal Wadowski'
  }
]

// ACTIONS
export const actions = {
  updateSlide: createAction('change to slide with index', (index) => ({ index }))
}

// REDUCER
export const reducer = combineReducers({
  currentSlide: createReducer({
    [actions.updateSlide]: (state, payload) => {
      return payload.index % images.length
    }
  }, 1)
})

// SELECTORS
export const selectors = createSelectors(path, reducer)

selectors.currentImage = createSelector(
  selectors.currentSlide,
  (currentSlide) => {
    return images[currentSlide]
  }
)

selectors.imageCount = () => images.length

export default createLogic({
  path,
  // constants,
  actions,
  reducer,
  selectors
})
