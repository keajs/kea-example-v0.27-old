import './styles.scss'

import React, { Component, PropTypes } from 'react'
import { inline } from 'kea/logic'

import { take, race, put } from 'redux-saga/effects'

import delay from '~/utils/delay'
import range from '~/utils/range'

import images from './images'

@inline({
  key: (props) => props.id,

  path: (key) => ['scenes', 'homepage', 'slider', key],

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
        const currentSlide = yield this.get('currentSlide')
        yield put(updateSlide(currentSlide + 1))
      }
    }
  },

  stop: function * () {
    console.log('Stopping homepage slider saga')
  }
})
export default class Slider extends Component {
  render () {
    const { currentSlide, currentImage } = this.props
    const { updateSlide } = this.actions

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
