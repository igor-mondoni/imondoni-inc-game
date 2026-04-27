import type { AppDispatch, RootState } from '../../app/store'
import { buyAssetSuccess } from '../assets/assetsSlice'
import {
  addClickPower,
  addDevPoints,
  addOwnedItem,
  addOwnedUpgrade,
  addPointsPerSecond,
  incrementClickedTimes,
  multiplyClickPower,
  multiplyPointsPerSecond,
  spendDevPoints,
  addXpPoint,
  addLevel
} from '../player/playerSlice'
import { getLevelDataFromXp } from '../../game/level'
import { updateUpgradeCost } from '../upgrades/upgradesSlice'
import { LEVEL_CAP } from '../../game/data/xpTable'

const COST_MULTIPLIER_PER_BUY_ASSET = 1.15
const CLICKPOWER_MULTIPLIER_PER_BUY_ASSET = 1.05
const COST_MULTIPLIER_PER_BUY_UPGRADE = 1.3

export const handleManualClickWithBonus =
  (onBonusMessage?: (message: string) => void) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
      const state = getState()
      const currentStatus = state.player

      const newClickedTimes = currentStatus.clickedTimes + 1
      let bonus = 0
      let message = ''
      let xpGained = 0;
      if (newClickedTimes > 0 && newClickedTimes % 100000 === 0) {
        xpGained = 50;
        bonus = (currentStatus.pointsPerSecond * 10) + (currentStatus.pointsPerSecond * (currentStatus.clickpower * 10)) + 10000000
        message = `+${Math.floor(bonus)} DP de bônus por produtividade máxima!`
      } else if (newClickedTimes > 0 && newClickedTimes % 10000 === 0) {
        xpGained = 30;
        bonus = (currentStatus.pointsPerSecond * 10) + (currentStatus.pointsPerSecond * (currentStatus.clickpower * 1.5)) + Math.floor(Math.random() * (999999 - 1 + 1)) + 1
        message = `+${Math.floor(bonus)} DP de bônus por super produtividade!`
      } else if (newClickedTimes > 0 && newClickedTimes % 1000 === 0) {
        xpGained = 10;
        bonus = (currentStatus.pointsPerSecond * 10) + (currentStatus.pointsPerSecond * (currentStatus.clickpower * 0.35)) + Math.floor(Math.random() * (9999 - 1 + 1)) + 1
        message = `+${Math.floor(bonus)} DP de bônus por bastante produtividade!`
      } else if (newClickedTimes > 0 && newClickedTimes % 100 === 0) {
        xpGained = 5;
        bonus = (currentStatus.pointsPerSecond * 10) + (currentStatus.pointsPerSecond * (currentStatus.clickpower * 0.01)) + Math.floor(Math.random() * (999 - 1 + 1)) + 1
        message = `+${Math.floor(bonus)} DP de bônus por produtividade!`
      }

      dispatch(incrementClickedTimes())
      dispatch(addDevPoints(currentStatus.clickpower + bonus))
      dispatch(handleAddXpPoint(xpGained))
      if (message && onBonusMessage) {
        onBonusMessage(message)
      }
    }

export const handleBuyAsset =
  (assetId: number) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
      const state = getState()

      const asset = state.assets.items.find((a) => a.id === assetId)
      if (!asset) return

      if (state.player.devPointsOwned < asset.devPointsCost) return

      dispatch(spendDevPoints(asset.devPointsCost))
      dispatch(addPointsPerSecond(asset.pps))
      dispatch(addClickPower(asset.clickpower || 0))
      dispatch(addOwnedItem(asset.id))

      dispatch(
        buyAssetSuccess({
          assetId,
          costMultiplier: COST_MULTIPLIER_PER_BUY_ASSET,
          clickPowerMultiplier: CLICKPOWER_MULTIPLIER_PER_BUY_ASSET,
        })
      )
    }

export const handleBuySpecialUpgrade =
  (upgradeId: number) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
      const state = getState()

      const upgrade = state.specialUpgrades.items.find((u) => u.id === upgradeId)
      if (!upgrade) return

      if (state.player.devPointsOwned < upgrade.cost) return

      dispatch(spendDevPoints(upgrade.cost))
      dispatch(addOwnedUpgrade(upgrade.id))

      if (upgrade.type === 'clickpower') {
        dispatch(multiplyClickPower(upgrade.value))
      }

      if (upgrade.type === 'pps') {
        dispatch(multiplyPointsPerSecond(upgrade.value))
      }

      dispatch(
        updateUpgradeCost({
          upgradeId,
          costMultiplier: COST_MULTIPLIER_PER_BUY_UPGRADE,
        })
      )
    }


export const handleAddXpPoint =
  (xpPoint: number) =>
    (dispatch: AppDispatch, getState: () => RootState) => {
      const state = getState()
      const currentLevel = getLevelDataFromXp(state.player.experienceOwned)
      const newCurrentXp = state.player.experienceOwned + xpPoint
      const newCurrentLevel = getLevelDataFromXp(newCurrentXp);
      dispatch(addXpPoint(xpPoint))
      if (currentLevel.level < newCurrentLevel.level && LEVEL_CAP >= currentLevel.level) {
        dispatch(addDevPoints(newCurrentLevel.dpBonus));
        dispatch(addLevel(newCurrentLevel.level));
        dispatch(multiplyClickPower(newCurrentLevel.bonusPower))
        dispatch(multiplyPointsPerSecond(newCurrentLevel.bonusPps))
      }
    }