import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { PlayerStatus } from '../../types/game'

const initialState: PlayerStatus = {
  devPointsOwned: 0,
  clickpower: 1,
  clickedTimes: 0,
  pointsPerSecond: 0,
  ownedItens: [],
  ownedUpgrades: [],
  experienceOwned: 0,
  currentLevel: 1
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    addDevPoints: (state, action: PayloadAction<number>) => {
      state.devPointsOwned += action.payload
    },

    spendDevPoints: (state, action: PayloadAction<number>) => {
      state.devPointsOwned -= action.payload
    },

    incrementClickedTimes: (state) => {
      state.clickedTimes += 1
    },
   incrementClickedTimesDebugger: (state, action: PayloadAction<number>) => {
      state.clickedTimes += action.payload
    },

    addClickPower: (state, action: PayloadAction<number>) => {
      state.clickpower += action.payload
    },

    multiplyClickPower: (state, action: PayloadAction<number>) => {
      state.clickpower = state.clickpower * (1 + action.payload)
    },

    addPointsPerSecond: (state, action: PayloadAction<number>) => {
      state.pointsPerSecond += action.payload
    },

    multiplyPointsPerSecond: (state, action: PayloadAction<number>) => {
      state.pointsPerSecond = state.pointsPerSecond * (1 + action.payload)
    },

    addOwnedItem: (state, action: PayloadAction<number>) => {
      state.ownedItens.push(action.payload)
    },

    addOwnedUpgrade: (state, action: PayloadAction<number>) => {
      state.ownedUpgrades.push(action.payload)
    },
    addXpPoint: (state, action: PayloadAction<number>) => {
      state.experienceOwned += action.payload
    },
    addLevel: (state, action: PayloadAction<number>) => {
      const newXpLevel = action.payload - state.currentLevel
      state.currentLevel += newXpLevel
    },

    resetPlayer: () => initialState,
  },
})

export const {
  addDevPoints,
  spendDevPoints,
  incrementClickedTimes,
  addClickPower,
  multiplyClickPower,
  addPointsPerSecond,
  multiplyPointsPerSecond,
  addOwnedItem,
  addOwnedUpgrade,
  resetPlayer,
  addXpPoint,
  addLevel,
  incrementClickedTimesDebugger
} = playerSlice.actions

export default playerSlice.reducer