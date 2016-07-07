import { PropTypes } from 'react'
import { createAction } from 'redux-act'
import Logic, { createMapping } from 'kea-logic'

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

class SliderLogic extends Logic {
  constructor () {
    super()
    this.init()
  }

  // PATH
  path = () => ['scenes', 'homepage', 'slider']

  // CONSTANTS
  // constants = () => mirrorCreator([
  // ])
  //

  // ACTIONS
  actions = ({ constants }) => ({
    updateSlide: createAction('change to slide with index', (index) => ({ index }))
  })

  // REDUCER
  structure = ({ actions, constants }) => ({
    currentSlide: createMapping({
      [actions.updateSlide]: (state, payload) => {
        return payload.index % images.length
      }
    }, 1, PropTypes.number)
  })

  // SELECTORS (data from reducer + more)
  selectors = ({ path, structure, constants, selectors, addSelector }) => {
    addSelector('currentImage', PropTypes.object, [
      selectors.currentSlide
    ], (currentSlide) => {
      return images[currentSlide]
    })

    addSelector('imageCount', PropTypes.number, [], () => images.length)
  }
}

export default new SliderLogic()
