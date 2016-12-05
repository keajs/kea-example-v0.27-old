import Saga from 'kea/saga'
import { take, race, put, cancelled } from 'redux-saga/effects'

import delay from '~/utils/delay'

import sliderLogic from '~/scenes/homepage/slider/logic'

class HomepageSliderSaga extends Saga {
  actions = () => ([
    sliderLogic, [
      'updateSlide'
    ]
  ])

  run = function * () {
    const { updateSlide } = this.actions

    console.log('Starting homepage slider saga')

    try {
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
    } finally {
      if (yield cancelled()) {
        console.log('Stopping homepage slider saga')
      }
    }
  }
}

export default new HomepageSliderSaga().init()
