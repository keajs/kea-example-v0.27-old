import './styles.scss'

import React, { Component } from 'react'

import Header from '~/components/header'
import Scene from '~/scenes/todos'

export default class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Scene />
      </div>
    )
  }
}
