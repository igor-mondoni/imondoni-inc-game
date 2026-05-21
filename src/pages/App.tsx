
import ClickerPanel from '../components/ClickerPanel/ClickerPanel'
import styles from '../styles/GamePage.module.css'
function App() {
    return (
        <main className={styles.mainColumn}>
            <ClickerPanel />
            <div className={styles.lockedSection}>
                <h2 className={styles.lockedSectionTitle}>
                    Próximos painéis do jogo
                </h2>
                <button className={styles.unlockButton} disabled>
                    Em breve
                </button>
            </div>
        </main>
    )
}

export default App