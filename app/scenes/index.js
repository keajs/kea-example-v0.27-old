import './styles.scss'

import React from 'react'
import { Route } from 'react-router'

import async from '~/components/async'

import Header from '~/components/header'

const Homepage = async('Homepage', () => import(/* webpackChunkName: "homepage" */'./homepage'))
const Todos = async('Todos', () => import(/* webpackChunkName: "todos" */'./todos'))

export default () => (
  <div>
    <Header />
    <div>
      <Route exact path='/' component={Homepage} />
      <Route path='/todos' component={Todos} />
    </div>
  </div>
)
