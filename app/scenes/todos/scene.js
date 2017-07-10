import { createScene } from 'kea/scene'

import sceneComponent from '~/scenes/todos/index'

export default createScene({
  name: 'todos',
  component: sceneComponent
})
