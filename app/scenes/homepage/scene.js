import { createScene } from 'kea/scene'

import sceneComponent from '~/scenes/homepage/index'
import sceneSaga from '~/scenes/homepage/saga'

export default createScene({
  name: 'homepage',
  component: sceneComponent,
  sagas: [
    sceneSaga
  ]
})
