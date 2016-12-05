import Saga from 'kea/saga'
import { cancelled } from 'redux-saga/effects'

import delay from '~/utils/delay'

class HomepageSaga extends Saga {
  run = function * () {
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
}

export default new HomepageSaga().init()
