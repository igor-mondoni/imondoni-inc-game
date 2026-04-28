import { describe, expect, it } from 'vitest'
import { createTestStore } from '../../test/testStore'
import { handleBuyAsset } from './gameThunks'
import type { AppDispatch } from '../../app/store'
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
    const dispatch: AppDispatch = store.dispatch
    dispatch(handleBuyAsset(1))

    const state = store.getState()

    expect(state.player.devPointsOwned).toBeLessThan(100)
    expect(state.player.pointsPerSecond).toBeGreaterThanOrEqual(0)
    expect(state.assets.items.find((item) => item.id === 1)?.owned).toBe(1)
  })
})