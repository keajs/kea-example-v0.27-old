/* global window */

import { createStore, applyMiddleware, compose } from 'redux'
import { routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import { createRootSaga, createKeaStore } from 'kea-logic'

function * appSaga () {
}

const appReducers = {
  routing: routerReducer
}

const finalCreateStore = compose(
  applyMiddleware(createSagaMiddleware(createRootSaga(appSaga))),
  applyMiddleware(routerMiddleware(browserHistory)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = createKeaStore(finalCreateStore, appReducers)

export default store
