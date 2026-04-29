import { useEffect,useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addDevPoints } from '../../features/player/playerSlice'

import { Outlet } from "react-router"

import StatsBar from '../../components/StatsBar/StatsBar'
import PurchasePanel from '../../components/PurchasePanel/PurchasePanel'

import styles from '../../styles/GamePage.module.css'

function GameLayout() {
  const dispatch = useAppDispatch()
  const [bonusMessage, setBonusMessage] = useState('')

  const player = useAppSelector((state) => state.player)


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