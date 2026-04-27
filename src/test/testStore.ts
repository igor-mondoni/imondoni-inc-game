import { configureStore } from '@reduxjs/toolkit'
import playerReducer from '../features/player/playerSlice'
import assetsReducer from '../features/assets/assetsSlice'
import upgradesReducer from '../features/upgrades/upgradesSlice'

export function createTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: {
      player: playerReducer,
      assets: assetsReducer,
      upgrades: upgradesReducer,
    },
    preloadedState: preloadedState as RootState,
  })
}

export type RootState = ReturnType<
  ReturnType<typeof createTestStore>['getState']
>