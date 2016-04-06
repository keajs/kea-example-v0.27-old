/* global window */

// basic tools
import React from 'react'
import ReactDOM from 'react-dom'

// selector
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'

import todosScene from '~/scenes/todos/scene'

const rootSaga = todosScene.saga

// const sagaMiddleware = createSagaMiddleware(rootSaga)
const finalCreateStore = compose(
  // applyMiddleware(sagaMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const rootReducer = combineReducers({
  scenes: combineReducers({
    todos: todosScene.reducer
  })
  // form: formReducer,
  // routing: routeReducer
})

const configureStore = function configureStore (initialState) {
  return finalCreateStore(rootReducer, initialState)
}
const store = configureStore()

export default store
//
// // required for replaying actions from devtools to work
// // reduxRouterMiddleware.listenForReplays(store)
//
// // wait until languages loaded, then do magic
// i18n.changeLanguage(locale, () => {
//   ReactDOM.render(
//     <Provider store={store}>
//       {routes}
//     </Provider>,
//     document.getElementById('root')
//   )
// })
