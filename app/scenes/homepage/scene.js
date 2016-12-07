import { createScene } from 'kea/scene'

import sceneComponent from '~/scenes/homepage/index'
import sceneLogic from '~/scenes/homepage/logic'
import sceneSaga from '~/scenes/homepage/saga'

import sliderLogic from '~/scenes/homepage/slider/logic'
import sliderSaga from '~/scenes/homepage/slider/saga'

export default createScene({
  name: 'homepage',
  component: sceneComponent,
  logic: [
    sceneLogic,
    sliderLogic
  ],
  sagas: [
    sceneSaga,
    sliderSaga
  ]
})
