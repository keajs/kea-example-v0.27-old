/* global expect, test */
import { keaReducer } from 'kea'
import PropTypes from 'prop-types'

test('homepage logic has all the right properties', () => {
  keaReducer('scenes')

  const logic = require('./logic').default

  expect(logic.path).toEqual(['scenes', 'homepage', 'index'])

  // actions
  expect(Object.keys(logic.actions)).toEqual(['updateName'])

  const { updateName } = logic.actions

  expect(typeof updateName).toBe('function')
  expect(updateName.toString()).toBe('update name (homepage.index)')
  expect(updateName('newname')).toEqual({ payload: { name: 'newname' }, type: updateName.toString() })

  // reducers
  const defaultValues = { name: 'Chirpy' }
  const state = { scenes: { homepage: { index: defaultValues } } }
  expect(Object.keys(logic.reducers).sort()).toEqual(['name'])
  expect(Object.keys(logic.selectors).sort()).toEqual(['capitalizedName', 'name', 'root'])

  expect(logic.defaults).toHaveProperty('name', 'Chirpy')
  expect(logic.propTypes).toHaveProperty('name', PropTypes.string)

  const nameReducer = logic.reducers.name
  expect(nameReducer(undefined, updateName('newName'))).toEqual('newName')

  expect(logic.propTypes).toHaveProperty('capitalizedName', PropTypes.string)
  expect(logic.defaults).not.toHaveProperty('capitalizedName')

  // big reducer
  expect(typeof logic.reducer).toBe('function')
  expect(logic.reducer({}, { type: 'random action' })).toEqual(defaultValues)
  expect(logic.reducer({ name: 'something' }, { type: 'random action' })).toEqual({ name: 'something' })
  expect(logic.reducer({ name: 'something' }, updateName('newName'))).toEqual({ name: 'newName' })

  // selectors
  expect(Object.keys(logic.selectors).sort()).toEqual(['capitalizedName', 'name', 'root'])
  expect(logic.selectors.name(state)).toEqual('Chirpy')
  expect(logic.selectors.capitalizedName(state)).toEqual('Chirpy')

  // root selector
  expect(logic.selector(state)).toEqual(defaultValues)
  expect(logic.selectors.root(state)).toEqual(defaultValues)
})
