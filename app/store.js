/* global window */

import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { browserHistory } from 'react-router'
import { createRootSaga, keaReducer } from 'kea/scene'

function * appSaga () {
}

const reducers = combineReducers({
  routing: routerReducer,
  scenes: keaReducer('scenes')
})

const sagaMiddleware = createSagaMiddleware()
const finalCreateStore = compose(
  applyMiddleware(sagaMiddleware),
  applyMiddleware(routerMiddleware(browserHistory)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const store = finalCreateStore(reducers)

sagaMiddleware.run(createRootSaga(appSaga))

export default store
