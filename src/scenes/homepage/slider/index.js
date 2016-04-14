import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPropsFromLogic } from 'kea-logic'

import range from '~/utils/range'

import sliderLogic from './logic'

const { updateSlide } = sliderLogic.actions

const propSelector = selectPropsFromLogic([
  sliderLogic, [
    'currentSlide',
    'currentImage',
    'imageCount'
  ]
])

class Slider extends Component {
  static propTypes = {
    // libs
    dispatch: React.PropTypes.func.isRequired,

    // sceneLogic
    currentSlide: React.PropTypes.number.isRequired,
    currentImage: React.PropTypes.object.isRequired,
    imageCount: React.PropTypes.number.isRequired
  };

  static defaultProps = {
  };

  render () {
    const { dispatch, currentSlide, currentImage, imageCount } = this.props

    const title = `Image copyright by ${currentImage.author}`

    return (
      <div className='kea-slider'>
        <img src={currentImage.src} alt={title} title={title} />
        <div className='buttons'>
          {range(imageCount).map(i => (
            <a key={i} href='#' className={i === currentSlide ? 'selected' : ''} onClick={() => dispatch(updateSlide(i))}></a>
          ))}
        </div>
      </div>
    )
  }
}

export default connect(propSelector)(Slider)
