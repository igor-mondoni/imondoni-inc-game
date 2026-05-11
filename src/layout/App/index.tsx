import { useEffect, useState } from 'react'

import { Outlet } from "react-router"
import { useGameLoop } from "../../hooks/useGameLoop"

import StatsBar from '../../components/StatsBar/StatsBar'
import PurchasePanel from '../../components/PurchasePanel/PurchasePanel'

import styles from '../../styles/GamePage.module.css'

function GameLayout() {
  useGameLoop()
  const [bonusMessage, setBonusMessage] = useState('')
  useEffect(() => {
    if (!bonusMessage) return

    const timer = setTimeout(() => {
      setBonusMessage('')
    }, 3000)
    return () => clearTimeout(timer)
  }, [bonusMessage])
  return (
    <div className={styles.pageContainer}>
      <div className={styles.gameInterface}>
        <StatsBar />
        <div className={styles.gameLayout}>
          <aside className={styles.sidePanels}>
            <PurchasePanel />
          </aside>
          <Outlet />

        </div>
      </div>
    </div>
  )
}

export default GameLayout