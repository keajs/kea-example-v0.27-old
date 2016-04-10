import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'

class Header extends Component {
  static propTypes = {
    // libs
    dispatch: React.PropTypes.func.isRequired
  };

  static defaultProps = {
  };

  render () {
    return (
      <header className='body-header'>
        <nav>
          <a href='#'>Kea example</a>
          <a href='#' className='active'>Todos</a>
          <a href='#'>Saga example</a>
        </nav>
      </header>
    )
  }
}

export default connect()(Header)
