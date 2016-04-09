import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPropsFromLogic } from 'kea-logic'

import Todo from './todo'

import sceneLogic from './logic'

const { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } = sceneLogic.constants
const { showAll, showActive, showCompleted, addTodo, removeTodo, completeTodo, unCompleteTodo, clearCompleted } = sceneLogic.actions

const propSelector = selectPropsFromLogic([
  sceneLogic, [
    'visibilityFilter',
    'visibleTodos',
    'todoCount',
    'activeTodoCount',
    'completedTodoCount',
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
    this.clearCompleted = () => dispatch(clearCompleted())
  }

  handleKeyDown (e) {
    const { dispatch } = this.props

    if (e.keyCode === 13) {
      const { value } = this.refs.newTodo

      if (value) {
        dispatch(addTodo(value))
        this.refs.newTodo.value = ''
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
      </div>
    )
  }
}

export default connect(propSelector)(TodosScene)
