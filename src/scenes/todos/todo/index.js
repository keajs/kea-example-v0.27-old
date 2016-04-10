import React, { Component } from 'react'
import { connect } from 'react-redux'

import sceneLogic from '~/scenes/todos/logic'

const { renameTodo, removeTodo, completeTodo, unCompleteTodo } = sceneLogic.actions

const ESCAPE = 27
const ENTER = 13

class Todo extends Component {
  static propTypes = {
    // libs
    dispatch: React.PropTypes.func.isRequired,

    // props
    todo: React.PropTypes.object.isRequired
  };

  static defaultProps = {
  };

  constructor (props) {
    super(props)

    const { dispatch } = props

    this.state = {
      editing: false,
      editValue: ''
    }

    this.renameTodo = (value) => dispatch(renameTodo(this.props.todo.id, value))
    this.removeTodo = () => dispatch(removeTodo(this.props.todo.id))
    this.completeTodo = () => dispatch(completeTodo(this.props.todo.id))
    this.unCompleteTodo = () => dispatch(unCompleteTodo(this.props.todo.id))

    this.setEditing = () => this.setState({ editing: true, editValue: this.props.todo.todo })
    this.clearEditing = () => this.setState({ editing: false, editValue: '' })
    this.updateEditValue = () => this.setState({ editValue: this.refs.editField.value })

    this.onKeyDown = this.onKeyDown.bind(this)
    this.saveTodo = this.saveTodo.bind(this)
    this.cancelTodo = this.cancelTodo.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.editing && !prevState.editing) {
      const node = this.refs.editField
      node.focus()
      node.setSelectionRange(node.value.length, node.value.length)
    }
  }

  onKeyDown (e) {
    if (e.keyCode === ESCAPE) {
      this.cancelTodo()
    } else if (e.keyCode === ENTER) {
      this.saveTodo()
    }
  }

  saveTodo () {
    const { value } = this.refs.editField

    if (value.trim()) {
      this.renameTodo(value.trim())
      this.clearEditing()
    } else {
      this.removeTodo()
    }
  }

  cancelTodo () {
    this.clearEditing()
  }

  render () {
    const { todo } = this.props
    const { editing, editValue } = this.state

    return (
      editing ? (
        <li className='editing'>
          <input className='edit' ref='editField' value={editValue} onKeyDown={this.onKeyDown} onChange={this.updateEditValue} onBlur={this.saveTodo} />
        </li>
      ) : (
        <li className={todo.completed ? 'completed' : ''}>
          <div className='view'>
            <input className='toggle' checked={todo.completed} type='checkbox' onChange={todo.completed ? this.unCompleteTodo : this.completeTodo} />
            <label onDoubleClick={this.setEditing}>{todo.todo}</label>
            <button className='destroy' onClick={this.removeTodo}></button>
          </div>
        </li>
      )
    )
  }
}

export default connect()(Todo)
