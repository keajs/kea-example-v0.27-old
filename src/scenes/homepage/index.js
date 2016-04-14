import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPropsFromLogic } from 'kea-logic'

import Slider from './slider'

import sceneLogic from './logic'
import sliderLogic from './slider/logic'

const { updateName } = sceneLogic.actions

const propSelector = selectPropsFromLogic([
  sceneLogic, [
    'name',
    'capitalizedName'
  ],
  sliderLogic, [
    'currentSlide',
    'currentImage'
  ]
])

class HomepageScene extends Component {
  static propTypes = {
    // libs
    dispatch: React.PropTypes.func.isRequired,

    // sceneLogic
    name: React.PropTypes.string.isRequired,
    capitalizedName: React.PropTypes.string.isRequired,
    currentSlide: React.PropTypes.number.isRequired,
    currentImage: React.PropTypes.object.isRequired
  };

  static defaultProps = {
  };

  constructor (props) {
    super(props)

    this.updateName = (name) => this.props.dispatch(updateName(name))
  }

  render () {
    const { capitalizedName, currentSlide, currentImage } = this.props

    return (
      <div className='homepage-scene'>
        <Slider />
        <h1>Hello, I'm {capitalizedName} the Kea</h1>
        <p>
          You are viewing image #{currentSlide + 1}, taken by <a href={currentImage.url} target='_blank'>{currentImage.author}</a>
        </p>
      </div>
    )
  }
}

export default connect(propSelector)(HomepageScene)
