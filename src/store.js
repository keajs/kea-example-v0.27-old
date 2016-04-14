/* global window */

// selector
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

// const rootSaga = todosScene.worker

// const sagaMiddleware = createSagaMiddleware(rootSaga)
const finalCreateStore = compose(
  // applyMiddleware(sagaMiddleware),
  applyMiddleware(
    routerMiddleware(browserHistory)
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

function createReducer (scenes) {
  const hasScenes = scenes && Object.keys(scenes).length > 0

  return combineReducers({
    // form: formReducer,
    routing: routerReducer,

    scenes: hasScenes ? combineReducers(scenes) : () => ({})
  })
}

const rootReducer = createReducer(loadedScenes)

const store = finalCreateStore(rootReducer)

let loadedScenes = {}
store.addKeaScene = function (name, scene) {
  loadedScenes[name] = scene.reducer
  this.replaceReducer(createReducer(loadedScenes))
}

export default store
