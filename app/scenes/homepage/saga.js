import { createSaga } from 'kea/saga'

import delay from '~/utils/delay'

export default createSaga({
  start: function * () {
    console.log('Starting homepage saga')

    this.count = 0

    while (true) {
      yield delay(3000)
      this.count += 1
      console.log(this.count)
    }
  },

  stop: function * () {
    console.log('Stopping homepage saga')
    console.log(`got to ${this.count}`)
  }
})
