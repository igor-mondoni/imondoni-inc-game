import styles from '../../styles/GamePage.module.css'

interface ClickerPanelProps {
  onManualClick: () => void
  clickpower: number
}

export default function ClickerPanel({
  onManualClick,
  clickpower,
}: ClickerPanelProps) {
  return (
    <section className={styles.clickerPanel}>
      <h2 className={styles.panelTitle}>Escrever Código</h2>

      <button
        className={styles.clickerButton}
        onClick={onManualClick}
      >
        +{clickpower.toFixed(1)} DP
      </button>
    </section>
  )
}