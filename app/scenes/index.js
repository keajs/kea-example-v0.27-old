import './styles.scss'

import React, { Component } from 'react'

import Header from '~/components/header'

import Routes from './routes'

export default class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <Routes />
      </div>
    )
  }
}
