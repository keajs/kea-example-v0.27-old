import App from './index'

const scenes = {
  homepage: require('bundle?lazy&name=homepage!./homepage/scene.js'),
  todos: require('bundle?lazy&name=todos!./todos/scene.js')
}

const routes = {
  '/': 'homepage',
  '/todos': 'todos',
  '/todos/:visible': 'todos'
}

function lazyLoad (store, name) {
  return (location, cb) => {
    scenes[name](module => {
      const scene = module.default
      store.addKeaScene(name, scene)
      cb(null, scene.component)
    })
  }
}

export default function getRoutes (store) {
  return {
    component: App,
    childRoutes: Object.keys(routes).map(route => ({
      path: route,
      getComponent: lazyLoad(store, routes[route])
    }))
  }
}
