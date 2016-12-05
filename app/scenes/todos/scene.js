import { createScene } from 'kea/logic'

import sceneComponent from '~/scenes/todos/index'
import sceneLogic from '~/scenes/todos/logic'
import sceneSaga from '~/scenes/todos/saga'

export default createScene({
  name: 'todos',
  component: sceneComponent,
  logic: [
    sceneLogic
  ],
  sagas: [
    sceneSaga
  ]
})
