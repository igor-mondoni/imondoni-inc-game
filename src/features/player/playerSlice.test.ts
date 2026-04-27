import { describe, expect, it } from 'vitest'
import playerReducer, {
  addDevPoints,
  spendDevPoints,
  addClickPower,
} from './playerSlice'

describe('playerSlice', () => {
  it('deve retornar o estado inicial', () => {
    const state = playerReducer(undefined, { type: 'unknown' })

    expect(state).toEqual({
      devPointsOwned: 0,
      clickpower: 1,
      clickedTimes: 0,
      pointsPerSecond: 0,
      ownedItens: [],
      ownedUpgrades: [],
    })
  })

  it('deve adicionar dev points', () => {
    const initialState = playerReducer(undefined, { type: 'unknown' })
    const state = playerReducer(initialState, addDevPoints(10))

    expect(state.devPointsOwned).toBe(10)
  })

  it('deve gastar dev points', () => {
    const initialState = {
      devPointsOwned: 100,
      clickpower: 1,
      clickedTimes: 0,
      pointsPerSecond: 0,
      ownedItens: [],
      ownedUpgrades: [],
    }

    const state = playerReducer(initialState, spendDevPoints(30))
    expect(state.devPointsOwned).toBe(70)
  })

  it('deve aumentar click power', () => {
    const initialState = playerReducer(undefined, { type: 'unknown' })
    const state = playerReducer(initialState, addClickPower(2))

    expect(state.clickpower).toBe(3)
  })
})