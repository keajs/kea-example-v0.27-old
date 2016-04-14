import './styles.scss'

import React, { Component } from 'react'

import Header from '~/components/header'
import HomepageScene from '~/scenes/homepage'
import TodosScene from '~/scenes/todos'

export default class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <HomepageScene />
        <TodosScene />
      </div>
    )
  }
}
