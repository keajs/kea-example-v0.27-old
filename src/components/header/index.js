import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { push } from 'react-router-redux'

class Header extends Component {
  static propTypes = {
    // libs
    dispatch: React.PropTypes.func.isRequired
  };

  static defaultProps = {
  };

  render () {
    const { dispatch } = this.props

    function load (url) {
      return (event) => { event.preventDefault(); dispatch(push(url)) }
    }

    return (
      <header className='body-header'>
        <nav>
          <a href='/' onClick={load('/')}>Kea example</a>
          <a href='/todos' onClick={load('/todos')} className='active'>Todos</a>
          <a href='#'>Saga example</a>
        </nav>
      </header>
    )
  }
}

export default connect()(Header)
