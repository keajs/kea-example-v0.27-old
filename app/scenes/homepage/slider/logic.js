import { PropTypes } from 'react'
import Logic, { initLogic } from 'kea/logic'

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

@initLogic
export default class SliderLogic extends Logic {
  // PATH
  path = () => ['scenes', 'homepage', 'slider']

  // CONSTANTS
  // constants = () => [
  //   'SOMETHING'
  // ]
  //

  // ACTIONS
  actions = ({ constants }) => ({
    updateSlide: index => ({ index })
  })

  // REDUCERS
  reducers = ({ actions, constants }) => ({
    currentSlide: [0, PropTypes.number, {
      [actions.updateSlide]: (state, payload) => payload.index % images.length
    }]
  })

  // SELECTORS
  selectors = ({ constants, selectors }) => ({
    currentImage: [
      () => [selectors.currentSlide],
      (currentSlide) => images[currentSlide],
      PropTypes.object
    ],

    imageCount: [
      () => [],
      () => images.length,
      PropTypes.number
    ]
  })
}
