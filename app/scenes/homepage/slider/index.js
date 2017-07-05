import './styles.scss'

import React, { Component, PropTypes } from 'react'
import { inline } from 'kea/logic'

import { take, race, put } from 'redux-saga/effects'

import delay from '~/utils/delay'
import range from '~/utils/range'

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

export const path = (key) => ['scenes', 'homepage', 'slider', key]
@inline({
  key: (props) => props.id,

  path: path,

  actions: () => ({
    updateSlide: index => ({ index })
  }),

  reducers: ({ actions, key }) => ({
    currentSlide: [0, PropTypes.number, {
      [actions.updateSlide]: (state, payload) => payload.key === key ? payload.index % images.length : state
    }]
  }),

  selectors: ({ selectors }) => ({
    currentImage: [
      () => [selectors.currentSlide],
      (currentSlide) => images[currentSlide],
      PropTypes.object
    ]
  }),

  start: function * () {
    const { updateSlide } = this.actions

    console.log('Starting homepage slider saga')

    while (true) {
      const { timeout } = yield race({
        change: take(updateSlide),
        timeout: delay(5000)
      })

      if (timeout) {
        const currentSlide = yield sliderLogic.get('currentSlide')
        yield put(updateSlide(currentSlide + 1))
      }
    }
  },

  stop: function * () {
    console.log('Stopping homepage slider saga')
  }
})
export default class Slider extends Component {
  constructor (props) {
    super(props)
    console.log('old constructor', props)

    this.state = {
      currentSlide: props.currentSlide
    }
  }

  componentWillMount () {
    console.log('will mount original', this)
  }

  render () {
    const { currentSlide, currentImage } = this.props
    const { updateSlide } = this.props.actions

    const title = `Image copyright by ${currentImage.author}`

    return (
      <div className='kea-slider'>
        <img src={currentImage.src} alt={title} title={title} />
        <div className='buttons'>
          {range(images.length).map(i => (
            <a key={i} href='#' className={i === currentSlide ? 'selected' : ''} onClick={() => updateSlide(i)} />
          ))}
        </div>
      </div>
    )
  }
}
