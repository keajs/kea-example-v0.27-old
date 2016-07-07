import { SagaCancellationException } from 'redux-saga'

import { take, race, put } from 'redux-saga/effects'

import sliderLogic from './logic'

import delay from '~/utils/delay'

const { updateSlide } = sliderLogic.actions

export default function * saga () {
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
  } catch (error) {
    if (error instanceof SagaCancellationException) {
      // saga cancelled, do cleanup
      console.log('Stopping homepage slider saga')
    } else {
      // some other error
      console.error(error)
    }
  }
}
