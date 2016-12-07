import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { getRoutes } from 'kea/scene'

import App from './scenes/index'
import routes from './scenes/routes'
import store from './store'

import './index.html'

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={getRoutes(App, store, routes)} />
  </Provider>,
  document.getElementById('root')
)
