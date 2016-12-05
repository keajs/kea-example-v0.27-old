import Saga from 'kea/saga'

class TodosSaga extends Saga {
  run = function * () {
    console.log('Starting todos saga')
  }
}

export default new TodosSaga().init()
