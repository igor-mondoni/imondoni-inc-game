import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { addDevPoints } from './features/player/playerSlice'
import {
  handleBuyAsset,
  handleBuySpecialUpgrade,
  handleManualClickWithBonus,
} from './features/game/gameThunks'

import StatsBar from './components/StatsBar/StatsBar'
import PurchasePanel from './components/PurchasePanel/PurchasePanel'
import ClickerPanel from './components/ClickerPanel/ClickerPanel'

import styles from './styles/GamePage.module.css'

function App() {
  const dispatch = useAppDispatch()

  const player = useAppSelector((state) => state.player)
  const assets = useAppSelector((state) => state.assets.items)
  const upgrades = useAppSelector((state) => state.specialUpgrades.items)

  const [bonusMessage, setBonusMessage] = useState('')

  useEffect(() => {
    if (player.pointsPerSecond === 0) return

    const gameLoop = setInterval(() => {
      dispatch(addDevPoints(player.pointsPerSecond / 10))
    }, 100)

    return () => clearInterval(gameLoop)
  }, [dispatch, player.pointsPerSecond])

  useEffect(() => {
    if (!bonusMessage) return

    const timer = setTimeout(() => {
      setBonusMessage('')
    }, 3000)
    return () => clearTimeout(timer)
  }, [bonusMessage])
  const onManualClick = () => {
    dispatch(handleManualClickWithBonus(setBonusMessage))
  }
  const onBuyAsset = (assetId: number) => {
    dispatch(handleBuyAsset(assetId))
  }
  const onBuySpecialUpgrade = (upgradeId: number) => {
    dispatch(handleBuySpecialUpgrade(upgradeId))
  }
  return (
    <div className={styles.pageContainer}>
      <div className={styles.gameInterface}>
        <StatsBar
          devPoints={player.devPointsOwned}
          pointsPerSecond={player.pointsPerSecond}
          currentLevel={player.currentLevel}
          currentXpPoint={player.experienceOwned}
        />
        <div className={styles.gameLayout}>
          <aside className={styles.sidePanels}>
            <PurchasePanel
              assets={assets}
              upgrades={upgrades}
              devPoints={player.devPointsOwned}
              onBuyAsset={onBuyAsset}
              onBuySpecialUpgrade={onBuySpecialUpgrade}
            />
          </aside>

          <main className={styles.mainColumn}>
            <ClickerPanel
              onManualClick={onManualClick}
              clickpower={player.clickpower}
            />

            {bonusMessage && (
              <div className={styles.bonusMessage}>
                {bonusMessage}
              </div>
            )}

            <div className={styles.lockedSection}>
              <h2 className={styles.lockedSectionTitle}>
                Próximos painéis do jogo
              </h2>
              <button className={styles.unlockButton} disabled>
                Em breve
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App