import './styles.scss'

import React, { Component } from 'react'

import { NavLink } from 'react-router-dom'

export default class Header extends Component {
  render () {
    return (
      <header className='body-header'>
        <nav>
          <NavLink to='/' exact>Kea example</NavLink>
          <NavLink to='/todos'>Todos</NavLink>

          <a className='right' href='https://www.github.com/keajs/kea-example' target='_blank'>Fork on Github</a>
        </nav>
      </header>
    )
  }
}
