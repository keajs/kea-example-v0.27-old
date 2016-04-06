import { createScene } from 'kea-logic'

import sceneLogic from '~/scenes/todos/logic'
import sceneSaga from '~/scenes/todos/saga'

export default createScene({
  name: 'todos',
  logic: [
    sceneLogic
  ],
  sagas: [
    sceneSaga
  ]
})
