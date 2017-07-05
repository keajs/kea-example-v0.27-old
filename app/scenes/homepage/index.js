import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea/logic'

import Slider from './slider'

import sceneLogic from './logic'

@connect({
  actions: [
    sceneLogic, [
      'updateName'
    ]
  ],
  props: [
    sceneLogic, [
      'name',
      'capitalizedName'
    ],
    Slider.kea.path(1), [
      'currentSlide',
      'currentImage'
    ]
  ]
})
export default class HomepageScene extends Component {
  updateName = () => {
    const { name } = this.props
    const { updateName } = this.props.actions

    const newName = window.prompt('Please enter the name', name)

    if (newName) {
      updateName(newName)
    }
  }

  render () {
    const { capitalizedName, currentSlide, currentImage } = this.props

    return (
      <div className='homepage-scene'>
        <Slider id={1} />
        <h1>
          Hello, I'm <em onClick={this.updateName}>{capitalizedName}</em> the Kea
        </h1>
        {currentImage ? (
          <p>
            You are viewing image #{currentSlide + 1}, taken by <a href={currentImage.url} target='_blank'>{currentImage.author}</a>
          </p>
        ) : null}
      </div>
    )
  }
}

