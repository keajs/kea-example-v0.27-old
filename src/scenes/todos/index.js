import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPropsFromLogic } from 'kea-logic'

import Todo from './todo'

import sceneLogic from './logic'

const { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } = sceneLogic.constants
const { showAll, showActive, showCompleted, addTodo, toggleAll, clearCompleted } = sceneLogic.actions

const ENTER = 13

const propSelector = selectPropsFromLogic([
  sceneLogic, [
    'visibilityFilter',
    'visibleTodos',
    'todoCount',
    'activeTodoCount',
    'completedTodoCount'
  ]
])

class TodosScene extends Component {
  static propTypes = {
    // libs
    dispatch: React.PropTypes.func.isRequired,

    // sceneLogic
    visibilityFilter: React.PropTypes.string.isRequired,
    visibleTodos: React.PropTypes.array.isRequired,
    todoCount: React.PropTypes.number.isRequired,
    activeTodoCount: React.PropTypes.number.isRequired,
    completedTodoCount: React.PropTypes.number.isRequired
  };

  static defaultProps = {
  };

  constructor (props) {
    super(props)

    const { dispatch } = props

    this.handleKeyDown = this.handleKeyDown.bind(this)

    this.showAll = () => dispatch(showAll())
    this.showActive = () => dispatch(showActive())
    this.showCompleted = () => dispatch(showCompleted())
    this.toggleAll = (e) => dispatch(toggleAll(e.target.checked))
    this.clearCompleted = () => dispatch(clearCompleted())
  }

  handleKeyDown (e) {
    const { dispatch } = this.props

    if (e.keyCode === ENTER) {
      const node = this.refs.newTodo

      if (node.value.trim()) {
        dispatch(addTodo(node.value.trim()))
        node.value = ''
      }
    }
  }

  render () {
    const { visibilityFilter, visibleTodos, todoCount, activeTodoCount, completedTodoCount } = this.props

    return (
      <div className='todo-scene'>
        <section className='todoapp'>
          <header className='header'>
            <h1>todos</h1>
            <input ref='newTodo' className='new-todo' placeholder='What needs to be done?' onKeyDown={this.handleKeyDown} />
          </header>
          {todoCount > 0 ? (
            <section className='main'>
              <input className='toggle-all' type='checkbox' onChange={this.toggleAll} checked={activeTodoCount === 0} />
              <ul className='todo-list'>
                {visibleTodos.map(todo => <Todo key={todo.id} todo={todo} />)}
              </ul>
            </section>
          ) : null}
          {todoCount > 0 ? (
            <footer className='footer'>
              <span className='todo-count'>
                {activeTodoCount} {activeTodoCount === 1 ? 'todo' : 'todos'} left
              </span>
              <ul className='filters'>
                <li>
                  <a href='#' onClick={this.showAll} className={visibilityFilter === SHOW_ALL ? 'selected' : ''}>All</a>
                </li>
                <li>
                  <a href='#' onClick={this.showActive} className={visibilityFilter === SHOW_ACTIVE ? 'selected' : ''}>Active</a>
                </li>
                <li>
                  <a href='#' onClick={this.showCompleted} className={visibilityFilter === SHOW_COMPLETED ? 'selected' : ''}>Completed</a>
                </li>
              </ul>
              {completedTodoCount > 0 ? (
                <button className='clear-completed' onClick={this.clearCompleted}>Clear completed</button>
              ) : null}
            </footer>
          ) : null}
        </section>
        <footer className='info'>
          <p>
            Double-click to edit a todo
          </p>
          <p>
            Created by <a href='https://github.com/mariusandra'>mariusandra</a>
          </p>
        </footer>
      </div>
    )
  }
}

export default connect(propSelector)(TodosScene)
