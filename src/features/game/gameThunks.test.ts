import { describe, expect, it } from 'vitest'
import { createTestStore } from '../../test/testStore'
import { handleBuyAsset } from './gameThunks'

describe('handleBuyAsset', () => {
  it('deve comprar asset quando houver pontos suficientes', () => {
    const store = createTestStore({
      player: {
        devPointsOwned: 100,
        clickpower: 1,
        clickedTimes: 0,
        pointsPerSecond: 0,
        ownedItens: [],
        ownedUpgrades: [],
      },
    })

    store.dispatch(handleBuyAsset(1) as any)

    const state = store.getState()

    expect(state.player.devPointsOwned).toBeLessThan(100)
    expect(state.player.pointsPerSecond).toBeGreaterThanOrEqual(0)
    expect(state.assets.items.find((item) => item.id === 1)?.owned).toBe(1)
  })

  it('não deve comprar asset sem pontos suficientes', () => {
    const store = createTestStore({
      player: {
        devPointsOwned: 0,
        clickpower: 1,
        clickedTimes: 0,
        pointsPerSecond: 0,
        ownedItens: [],
        ownedUpgrades: [],
      },
    })

    store.dispatch(handleBuyAsset(1) as any)

    const state = store.getState()
    expect(state.assets.items.find((item) => item.id === 1)?.owned).toBe(0)
  })
})