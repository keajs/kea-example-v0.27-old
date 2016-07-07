import React, { Component } from 'react'
import { connectMapping, propTypesFromMapping } from 'kea-logic'

import sceneLogic from '~/scenes/todos/logic'

const ESCAPE = 27
const ENTER = 13

const mapping = {
  actions: [
    sceneLogic, [
      'renameTodo',
      'removeTodo',
      'completeTodo',
      'unCompleteTodo'
    ]
  ]
  // no extra props needed
  // props: [
  //   sceneLogic, [
  //   ]
  // ]
}

class Todo extends Component {
  static propTypes = propTypesFromMapping(mapping, {
    todo: React.PropTypes.object.isRequired
  })

  constructor (props) {
    super(props)

    this.state = {
      editing: false,
      editValue: ''
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.editing && !prevState.editing) {
      const node = this.refs.editField
      node.focus()
      node.setSelectionRange(node.value.length, node.value.length)
    }
  }

  renameTodo = (value) => {
    const { renameTodo } = this.props.actions
    renameTodo(this.props.todo.id, value)
  }

  removeTodo = () => {
    const { removeTodo } = this.props.actions
    removeTodo(this.props.todo.id)
  }

  completeTodo = () => {
    const { completeTodo } = this.props.actions
    completeTodo(this.props.todo.id)
  }

  unCompleteTodo = () => {
    const { unCompleteTodo } = this.props.actions
    unCompleteTodo(this.props.todo.id)
  }

  setEditing = () => {
    this.setState({ editing: true, editValue: this.props.todo.todo })
  }

  clearEditing = () => {
    this.setState({ editing: false, editValue: '' })
  }

  updateEditValue = () => {
    this.setState({ editValue: this.refs.editField.value })
  }

  onKeyDown = (e) => {
    if (e.keyCode === ESCAPE) {
      this.cancelTodo()
    } else if (e.keyCode === ENTER) {
      this.saveTodo()
    }
  }

  saveTodo = () => {
    const { value } = this.refs.editField

    if (value.trim()) {
      this.renameTodo(value.trim())
      this.clearEditing()
    } else {
      this.removeTodo()
    }
  }

  cancelTodo = () => {
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

export default connectMapping(mapping)(Todo)
