/* global expect, it, beforeEach */
import { keaReducer } from 'kea'

const scenesReducer = keaReducer('components')

let reducerState1

beforeEach(() => {
  reducerState1 = scenesReducer({}, { type: 'discard' })
})

it('should connect to reducer tree', () => {
  expect(reducerState1).toEqual({})
})
