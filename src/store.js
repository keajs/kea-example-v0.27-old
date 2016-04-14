/* global window */

// selector
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import { take, cancel, fork } from 'redux-saga/effects'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

export const NEW_SCENE = '@@kea/NEW_SCENE'

let loadedReducers = {}
let loadedWorkers = {}
let currentScene = null

const rootSaga = function * () {
  let runningSaga = null

  while (true) {
    const { payload } = yield take(NEW_SCENE)

    if (runningSaga) {
      yield cancel(runningSaga)
    }

    if (loadedWorkers[payload.name]) {
      runningSaga = yield fork(loadedWorkers[payload.name])
    }
  }
}

const sagaMiddleware = createSagaMiddleware(rootSaga)
const finalCreateStore = compose(
  applyMiddleware(sagaMiddleware),
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

const rootReducer = createReducer(loadedReducers)

const store = finalCreateStore(rootReducer)

store.addKeaScene = function (name, scene) {
  if (currentScene === name) {
    return
  }

  loadedReducers[name] = scene.reducer
  loadedWorkers[name] = scene.worker
  this.replaceReducer(createReducer(loadedReducers))

  this.dispatch({
    type: NEW_SCENE,
    payload: {
      name
    }
  })

  currentScene = name
}

export default store
