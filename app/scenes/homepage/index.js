import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'

import Slider from './slider'

import sceneSaga from './saga'
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
    ]
  ],
  sagas: [
    sceneSaga
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
    const { capitalizedName } = this.props

    return (
      <div className='homepage-scene'>
        <h1>
          Hello, I'm <em onClick={this.updateName}>{capitalizedName}</em> the Kea
        </h1>
        <div className='slider-container'>
          <Slider id={1} initialSlide={0} />
          <Slider id={2} initialSlide={1} />
        </div>
        <div style={{ marginTop: 20 }}>
          This example demonstrates two components dynamically connected to redux.
          <br />
          Each have their own sagas that indepentenly update the image in the slider.
        </div>
      </div>
    )
  }
}

