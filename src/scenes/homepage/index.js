import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPropsFromLogic } from 'kea-logic'

import sceneLogic from './logic'

const { updateName } = sceneLogic.actions

const propSelector = selectPropsFromLogic([
  sceneLogic, [
    'name',
    'capitalizedName'
  ]
])

class HomepageScene extends Component {
  static propTypes = {
    // libs
    dispatch: React.PropTypes.func.isRequired,

    // sceneLogic
    name: React.PropTypes.string.isRequired,
    capitalizedName: React.PropTypes.string.isRequired
  };

  static defaultProps = {
  };

  constructor (props) {
    super(props)

    this.updateName = (name) => this.props.dispatch(updateName(name))
  }

  render () {
    const { capitalizedName } = this.props

    return (
      <div className='homepage-scene'>
        <h1>Hello, my name is {capitalizedName}</h1>
      </div>
    )
  }
}

export default connect(propSelector)(HomepageScene)
