import { take, race, put, cancelled } from 'redux-saga/effects'
import { selectActionsFromLogic } from 'kea/logic'

import delay from '~/utils/delay'

import sliderLogic from '~/scenes/homepage/slider/logic'

const actions = selectActionsFromLogic([
  sliderLogic, [
    'updateSlide'
  ]
])

export default function * saga () {
  const { updateSlide } = actions

  console.log('Starting homepage slider saga')

  try {
    while (true) {
      const { timeout } = yield race({
        change: take(updateSlide().type),
        timeout: delay(5000)
      })

      if (timeout) {
        // const currentSlide = yield select(sliderLogic.selectors.currentSlide)
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
