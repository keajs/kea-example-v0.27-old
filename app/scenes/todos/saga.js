import Saga from 'kea/saga'

export default class TodosSaga extends Saga {
  run = function * () {
    console.log('Starting todos saga')
  }
}
