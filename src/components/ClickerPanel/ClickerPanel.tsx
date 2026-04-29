import { useState } from 'react'
import styles from './ClickerPanel.module.css'
import {
  handleManualClickWithBonus,
} from '../../features/game/gameThunks'
import { useAppDispatch, useAppSelector } from '../../app/hooks'


export default function ClickerPanel() {
  const player = useAppSelector((state) => state.player)
  const clickpower = player.clickpower
  const dispatch = useAppDispatch()
  const [bonusMessage, setBonusMessage] = useState('')

  const onManualClick = () => {
    dispatch(handleManualClickWithBonus(setBonusMessage))
  }
  return (<>
    <section className={styles.clickerPanel}>
      <h2 className={styles.panelTitle}>Escrever Código</h2>

      <button
        className={styles.clickerButton}
        onClick={onManualClick}
      >
        +{clickpower.toFixed(1)} DP
      </button>
    </section>
    {bonusMessage && (
      <div className={styles.bonusMessage}>
        {bonusMessage}
      </div>
    )}
  </>
  )
}