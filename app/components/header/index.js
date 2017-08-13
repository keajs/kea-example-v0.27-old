import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'

import { push } from 'react-router-redux'

const routeSelector = state => state.router.location

@connect({
  props: [
    routeSelector, [
      'pathname'
    ]
  ]
})
export default class Header extends Component {
  render () {
    const { dispatch, pathname } = this.props

    function load (url) {
      return (event) => { event.preventDefault(); dispatch(push(url)) }
    }

    return (
      <header className='body-header'>
        <nav>
          <a href='/' onClick={load('/')} className={pathname === '/' ? 'active' : ''}>Kea example</a>
          <a href='/todos' onClick={load('/todos')} className={pathname.indexOf('/todos') === 0 ? 'active' : ''}>Todos</a>

          <a className='right' href='https://www.github.com/keajs/kea-example' target='_blank'>Fork on Github</a>
        </nav>
      </header>
    )
  }
}
