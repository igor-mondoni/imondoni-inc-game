import styles from '../../styles/GamePage.module.css'

interface StatsBarProps {
  devPoints: number
  pointsPerSecond: number,
  currentLevel: number,
  currentXpPoint: number
}

export default function StatsBar({
  devPoints,
  pointsPerSecond,
  currentLevel,
  currentXpPoint,

}: StatsBarProps) {
  return (
    <header className={styles.statsBar}>
      <div>
        <p>Xp atual: {currentXpPoint}</p>
        <p>Level Atual: {currentLevel}</p>
        <div className={styles.statsBarPoints}>
          {Math.floor(devPoints)} DevPoints
        </div>
        <div className={styles.statsBarPps}>
          {pointsPerSecond.toFixed(1)} DP/s
        </div>
      </div>
    </header>
  )
}