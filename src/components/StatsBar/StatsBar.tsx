import styles from './StatsBar.module.css'
import {  useAppSelector } from '../../app/hooks'
import { formatIntegerText } from "../../utils/helpers";
export default function StatsBar() {
    const player = useAppSelector((state) => state.player)
  
  return (
    <header className={styles.statsBar}>
      <div>
        <p>Xp atual: {player.experienceOwned}</p>
        <p>Level Atual: {player.currentLevel}</p>
        <div className={styles.statsBarPoints}>
          {formatIntegerText(player.devPointsOwned)} DevPoints
        </div>
        <div className={styles.statsBarPps}>
          {formatIntegerText(player.pointsPerSecond)} DP/s
        </div>
      </div>
    </header>
  )
}