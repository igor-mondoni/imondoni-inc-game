import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import  { SpecialUpgradesState } from '../../game/data/upgradeTable'

const initialState = SpecialUpgradesState;
const specialUpgradesSlice = createSlice({
  name: 'specialUpgrades',
  initialState,
  reducers: {
    updateUpgradeCost: (
      state,
      action: PayloadAction<{
        upgradeId: number
        costMultiplier: number
      }>
    ) => {
      const upgrade = state.items.find((u) => u.id === action.payload.upgradeId)

      if (!upgrade) return

      upgrade.cost = Math.floor(upgrade.cost * action.payload.costMultiplier)
    },

    resetSpecialUpgrades: () => initialState,
  },
})

export const { updateUpgradeCost, resetSpecialUpgrades } =
  specialUpgradesSlice.actions

export default specialUpgradesSlice.reducer