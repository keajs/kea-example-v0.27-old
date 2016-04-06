import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectPropsFromLogic } from 'kea-logic'

import sceneLogic from './logic'

const { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } = sceneLogic.constants
const { showAll, showActive, showCompleted, addTodo, removeTodo, completeTodo, unCompleteTodo, clearCompleted } = sceneLogic.actions

const propSelector = selectPropsFromLogic({
  visibilityFilter: sceneLogic,
  visibleTodos: sceneLogic,
  todoCount: sceneLogic,
  activeTodoCount: sceneLogic,
  completedTodoCount: sceneLogic
})

class TodosScene extends Component {
  static propTypes = {
    // libs
    dispatch: React.PropTypes.func.isRequired,

    // selector
    visibilityFilter: React.PropTypes.string.isRequired,
    visibleTodos: React.PropTypes.array.isRequired,
    todoCount: React.PropTypes.number.isRequired,
    activeTodoCount: React.PropTypes.number.isRequired,
    completedTodoCount: React.PropTypes.number.isRequired
  };

  static defaultProps = {
  };

  render () {
    const { visibilityFilter, visibleTodos, todoCount, activeTodoCount, completedTodoCount } = this.props

    return (
      <div className='todo-scene'>
        <section className='todoapp'>
          <header className='header'>
            <h1>todos</h1>
            <input className='new-todo' placeholder='What needs to be done?' />
          </header>
          {todoCount > 0 ? (
            <section className='main'>

            </section>
          ) : null}
          {todoCount > 0 ? (
            <footer className='footer'>
              <span className='todo-count'>
                {activeTodoCount} {activeTodoCount === 1 ? 'todo' : 'todos'} left
              </span>
              <ul className='filters'>
                <li>
                  <a href='#' className='selected'>All</a>
                </li>
                <li>
                  <a href='#'>Active</a>
                </li>
                <li>
                  <a href='#'>Completed</a>
                </li>
              </ul>
              {completedTodoCount > 0 ? (
                <button className='clear-completed'>Clear completed</button>
              ) : null}
            </footer>
          ) : null}
        </section>
      </div>
    )
  }
}

export default connect(propSelector)(TodosScene)
