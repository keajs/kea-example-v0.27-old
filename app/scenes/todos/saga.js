import Saga from 'kea/saga'

export default class TodosSaga extends Saga {
  start = function * () {
    console.log('Starting todos saga')
  }
}
