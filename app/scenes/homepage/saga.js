import { cancelled } from 'redux-saga/effects'

const delay = (ms, val = true) => new Promise((resolve) => setTimeout(() => resolve(val), ms))

export default function * saga () {
  console.log('Starting homepage saga')

  let count = 0

  try {
    while (true) {
      yield delay(3000)
      count += 1
      console.log(count)
    }
  } finally {
    // saga cancelled, do cleanup
    if (yield cancelled()) {
      console.log('Stopping homepage saga')
      console.log(`got to ${count}`)
    }
  }
}
