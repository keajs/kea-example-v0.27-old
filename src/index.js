import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from './store'
import getRoutes from './scenes/routes'

import 'index.html'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={getRoutes(store)} />
  </Provider>,
  document.getElementById('root')
)
