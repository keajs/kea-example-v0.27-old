import { PropTypes } from 'react'
import Logic from 'kea/logic'

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
  // PATH
  path = () => ['scenes', 'homepage', 'slider']

  // CONSTANTS
  // constants = () => mirrorCreator([
  // ])
  //

  // ACTIONS
  actions = ({ constants }) => ({
    updateSlide: index => ({ index })
  })

  // REDUCER
  structure = ({ actions, constants }) => ({
    currentSlide: [1, PropTypes.number, {
      [actions.updateSlide]: (state, payload) => payload.index % images.length
    }]
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

export default new SliderLogic().init()
