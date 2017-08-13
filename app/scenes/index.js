import './styles.scss'

import React from 'react'
import { Route } from 'react-router'

import asyncComponent from '~/utils/async-component'

import Header from '~/components/header'

export const Homepage = asyncComponent('Homepage', () => import(/* webpackChunkName: "homepage" */'./homepage'))
export const Todos = asyncComponent('Todos', () => import(/* webpackChunkName: "todos" */'./todos'))

export default () => (
  <div>
    <Header />
    <div>
      <Route exact path='/' component={Homepage} />
      <Route path='/todos' component={Todos} />
    </div>
  </div>
)
