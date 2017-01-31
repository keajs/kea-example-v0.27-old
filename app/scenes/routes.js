import { combineScenesAndRoutes } from 'kea/scene'

const scenes = {
  homepage: require('bundle-loader?lazy&name=homepage!./homepage/scene.js'),
  todos: require('bundle-loader?lazy&name=todos!./todos/scene.js')
}

const routes = {
  '/': 'homepage',
  '/todos': 'todos',
  '/todos/:visible': 'todos'
}

export default combineScenesAndRoutes(scenes, routes)
