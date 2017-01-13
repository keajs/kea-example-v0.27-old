import React, { Component, PropTypes } from 'react'
import { connect } from 'kea/logic'

import sceneLogic from '~/scenes/todos/logic'

const ESCAPE = 27
const ENTER = 13

@connect({
  propTypes: {
    id: PropTypes.string.isRequired
  },
  actions: [
    sceneLogic, [
      'renameTodo(id)',
      'removeTodo(id)',
      'completeTodo(id)',
      'unCompleteTodo(id)',
      'setEditing(id)',
      'updateEditValue(id)',
      'clearEditing(id)'
    ]
  ],
  props: [
    sceneLogic, [
      'todos[id] as todo'
    ]
  ]
})
export default class Todo extends Component {
  componentDidUpdate (prevProps) {
    if (this.props.todo.editing && !prevProps.todo.editing) {
      const node = this.refs.editField
      node.focus()
      node.setSelectionRange(node.value.length, node.value.length)
    }
  }

  updateEditValue = (e) => {
    const { updateEditValue } = this.props.actions
    updateEditValue(e.target.value)
  }

  onKeyDown = (e) => {
    const { clearEditing } = this.props.actions
    if (e.keyCode === ESCAPE) {
      clearEditing()
    } else if (e.keyCode === ENTER) {
      this.saveTodo()
    }
  }

  saveTodo = () => {
    const { renameTodo, clearEditing, removeTodo } = this.props.actions
    const { value } = this.refs.editField

    if (value.trim()) {
      renameTodo(value.trim())
      clearEditing()
    } else {
      removeTodo()
    }
  }

  render () {
    const { todo } = this.props
    const { unCompleteTodo,
            completeTodo,
            setEditing,
            removeTodo } = this.props.actions

    return (
      todo.editing ? (
        <li className='editing'>
          <input className='edit'
                 type='text'
                 ref='editField'
                 value={todo.editValue}
                 onKeyDown={this.onKeyDown}
                 onChange={this.updateEditValue}
                 onBlur={this.saveTodo} />
        </li>
      ) : (
        <li className={todo.completed ? 'completed' : ''}>
          <div className='view'>
            <input className='toggle'
                   checked={todo.completed}
                   type='checkbox'
                   onChange={todo.completed ? unCompleteTodo : completeTodo} />
            <label onTouchEnd={setEditing}
                   onDoubleClick={setEditing}>
              {todo.value}
            </label>
            <button className='destroy'
                    onClick={removeTodo} />
          </div>
        </li>
      )
    )
  }
}
