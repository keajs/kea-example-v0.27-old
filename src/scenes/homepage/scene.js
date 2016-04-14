import { createScene } from 'kea-logic'

import sceneLogic from '~/scenes/homepage/logic'
import sceneSaga from '~/scenes/homepage/saga'

export default createScene({
  name: 'homepage',
  logic: [
    sceneLogic
  ],
  sagas: [
    sceneSaga
  ]
})
