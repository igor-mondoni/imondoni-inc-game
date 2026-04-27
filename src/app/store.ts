import { configureStore } from '@reduxjs/toolkit'
import playerReducer from '../features/player/playerSlice'
import assetsReducer from '../features/assets/assetsSlice'
import upgradesReducer from '../features/upgrades/upgradesSlice'

export const store = configureStore({
  reducer: {
    player: playerReducer,
    assets: assetsReducer,
    specialUpgrades: upgradesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch