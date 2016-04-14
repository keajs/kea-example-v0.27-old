import { SagaCancellationException } from 'redux-saga'

// import { runInParallel } from 'kea-parallel'
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
  } catch (error) {
    if (error instanceof SagaCancellationException) {
      console.log('Stopping homepage saga')
      console.log(`got to ${count}`)
      // saga cancelled, do cleanup
    } else {
      // some other error
      console.error(error)
    }
  }
}
