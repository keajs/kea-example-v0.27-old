import './styles.scss'

import React, { Component } from 'react'
import { connect } from 'kea'
import { Switch, Route } from 'react-router'
import { NavLink } from 'react-router-dom'

import Todo from './todo'

import sceneLogic from './logic'

const ENTER = 13

@connect({
  actions: [
    sceneLogic, [
      'addTodo',
      'toggleAll',
      'clearCompleted'
    ]
  ],
  props: [
    sceneLogic, [
      'allTodos',
      'activeTodos',
      'completedTodos'
    ]
  ]
})
export default class TodosScene extends Component {
  handleToggleAll = (e) => {
    const { toggleAll } = this.actions
    toggleAll(e.target.checked)
  }

  handleKeyDown = (e) => {
    const { addTodo } = this.actions

    if (e.keyCode === ENTER) {
      const node = this.refs.newTodo

      if (node.value.trim()) {
        addTodo(node.value.trim())
        node.value = ''
      }
    }
  }

  render () {
    const { allTodos, activeTodos, completedTodos } = this.props
    const { clearCompleted } = this.actions

    return (
      <div className='todo-scene'>
        <section className='todoapp'>
          <header className='header'>
            <h1>todos</h1>
            <input ref='newTodo' className='new-todo' placeholder='What needs to be done?' onKeyDown={this.handleKeyDown} />
          </header>
          {allTodos.length > 0 ? (
            <section className='main'>
              <input className='toggle-all' type='checkbox' onChange={this.handleToggleAll} checked={activeTodos.length === 0} />
              <Switch>
                <Route path='/todos' exact>
                  <ul className='todo-list'>
                    {allTodos.map(todo => <Todo key={todo.id} todo={todo} />)}
                  </ul>
                </Route>
                <Route path='/todos/active'>
                  <ul className='todo-list'>
                    {activeTodos.map(todo => <Todo key={todo.id} todo={todo} />)}
                  </ul>
                </Route>
                <Route path='/todos/completed'>
                  <ul className='todo-list'>
                    {completedTodos.map(todo => <Todo key={todo.id} todo={todo} />)}
                  </ul>
                </Route>
              </Switch>
            </section>
          ) : null}
          {allTodos.length > 0 ? (
            <footer className='footer'>
              <span className='todo-count'>
                {activeTodos.length} {activeTodos.length === 1 ? 'todo' : 'todos'} left
              </span>
              <ul className='filters'>
                <li>
                  <NavLink to='/todos' exact activeClassName='selected'>All</NavLink>
                </li>
                <li>
                  <NavLink to='/todos/active' exact activeClassName='selected'>Active</NavLink>
                </li>
                <li>
                  <NavLink to='/todos/completed' exact activeClassName='selected'>Completed</NavLink>
                </li>
              </ul>
              {completedTodos.length > 0 ? (
                <button className='clear-completed' onClick={clearCompleted}>Clear completed</button>
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
