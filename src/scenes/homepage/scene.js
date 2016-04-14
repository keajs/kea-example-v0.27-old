import { createScene } from 'kea-logic'

import sceneComponent from '~/scenes/homepage/index'
import sceneLogic from '~/scenes/homepage/logic'
import sceneSaga from '~/scenes/homepage/saga'

export default createScene({
  name: 'homepage',
  component: sceneComponent,
  logic: [
    sceneLogic
  ],
  sagas: [
    sceneSaga
  ]
})
