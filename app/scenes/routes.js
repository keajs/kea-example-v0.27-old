import React from 'react'
import { Route } from 'react-router'

import asyncComponent from '~/utils/async-component'

export const Homepage = asyncComponent('Homepage', () => import(/* webpackChunkName: "homepage" */'./homepage'))
export const Todos = asyncComponent('Todos', () => import(/* webpackChunkName: "todos" */'./todos'))

export default () => (
  <div>
    <Route exact path='/' component={Homepage} />
    <Route path='/todos' component={Todos} />
  </div>
)
