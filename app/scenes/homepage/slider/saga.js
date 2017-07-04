import { createSaga } from 'kea/saga'
import { take, race, put } from 'redux-saga/effects'

import delay from '~/utils/delay'

import sliderLogic from '~/scenes/homepage/slider/logic'

export default createSaga({
  actions: () => ([
    sliderLogic, [
      'updateSlide'
    ]
  ]),

  start: function * () {
    const { updateSlide } = this.actions

    console.log('Starting homepage slider saga')

    while (true) {
      const { timeout } = yield race({
        change: take(updateSlide),
        timeout: delay(5000)
      })

      if (timeout) {
        const currentSlide = yield sliderLogic.get('currentSlide')
        yield put(updateSlide(currentSlide + 1))
      }
    }
  },

  stop: function * () {
    console.log('Stopping homepage slider saga')
  }
})
