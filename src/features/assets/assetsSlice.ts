import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import  { AssetsState } from '../../game/data/assetsTable'

const initialState = AssetsState;
const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    buyAssetSuccess: (
      state,
      action: PayloadAction<{
        assetId: number
        costMultiplier: number
        clickPowerMultiplier: number
      }>
    ) => {
      const asset = state.items.find((item) => item.id === action.payload.assetId)

      if (!asset) return

      asset.owned += 1
      asset.devPointsCost = Math.floor(
        asset.devPointsCost * action.payload.costMultiplier
      )
      asset.clickpower = asset.clickpower * action.payload.clickPowerMultiplier
    },

    resetAssets: () => initialState,
  },
})

export const { buyAssetSuccess, resetAssets } = assetsSlice.actions

export default assetsSlice.reducer