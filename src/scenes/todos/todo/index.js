import React, { Component } from 'react'
import { connect } from 'react-redux'

import sceneLogic from '~/scenes/todos/logic'

const { removeTodo, completeTodo, unCompleteTodo } = sceneLogic.actions

class Todo extends Component {
  static propTypes = {
    // libs
    dispatch: React.PropTypes.func.isRequired,

    // props
    todo: React.PropTypes.object.isRequired,
  };

  static defaultProps = {
  };

  constructor (props) {
    super(props)

    const { dispatch, todo } = props

    this.removeTodo = () => dispatch(removeTodo(todo.id))
    this.completeTodo = () => dispatch(completeTodo(todo.id))
    this.unCompleteTodo = () => dispatch(unCompleteTodo(todo.id))
  }

  render () {
    const { todo } = this.props

    return (
      <li className={todo.completed ? 'completed' : ''} key={todo.id}>
        <div className='view'>
          <input className='toggle' type='checkbox' onChange={todo.completed ? this.unCompleteTodo : this.completeTodo} />
          <label>{todo.todo}</label>
          <button className='destroy' onClick={this.removeTodo}></button>
        </div>
      </li>
    )
  }
}

export default connect()(Todo)
