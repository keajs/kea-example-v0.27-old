import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea/logic'

import range from '~/utils/range'

import sliderLogic from './logic'

@connect({
  actions: [
    sliderLogic, [
      'updateSlide'
    ]
  ],
  props: [
    sliderLogic, [
      'currentSlide',
      'currentImage',
      'imageCount'
    ]
  ]
})
export default class Slider extends Component {
  render () {
    const { currentSlide, currentImage, imageCount } = this.props
    const { updateSlide } = this.props.actions

    const title = `Image copyright by ${currentImage.author}`

    return (
      <div className='kea-slider'>
        <img src={currentImage.src} alt={title} title={title} />
        <div className='buttons'>
          {range(imageCount).map(i => (
            <a key={i} href='#' className={i === currentSlide ? 'selected' : ''} onClick={() => updateSlide(i)} />
          ))}
        </div>
      </div>
    )
  }
}
