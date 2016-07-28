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
      'unCompleteTodo',
      'setEditing',
      'updateEditValue',
      'clearEditing'
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

  componentDidUpdate (prevProps) {
    if (this.props.todo.editing && !prevProps.todo.editing) {
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
    const { setEditing } = this.props.actions
    setEditing(this.props.todo.id)
  }

  clearEditing = () => {
    const { clearEditing } = this.props.actions
    clearEditing(this.props.todo.id)
  }

  updateEditValue = () => {
    const { updateEditValue } = this.props.actions
    updateEditValue(this.props.todo.id, this.refs.editField.value)
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
    const { editing, editValue } = todo

    return (
      editing ? (
        <li className='editing'>
          <input className='edit' ref='editField' value={editValue} onKeyDown={this.onKeyDown} onChange={this.updateEditValue} onBlur={this.saveTodo} />
        </li>
      ) : (
        <li className={todo.completed ? 'completed' : ''}>
          <div className='view'>
            <input className='toggle' checked={todo.completed} type='checkbox' onChange={todo.completed ? this.unCompleteTodo : this.completeTodo} />
            <label onTouchEnd={this.setEditing} onDoubleClick={this.setEditing}>{todo.value}</label>
            <button className='destroy' onClick={this.removeTodo}></button>
          </div>
        </li>
      )
    )
  }
}

export default connectMapping(mapping)(Todo)
