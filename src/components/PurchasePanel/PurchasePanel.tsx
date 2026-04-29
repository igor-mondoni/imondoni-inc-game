import { useState } from 'react'
import styles from './PurchasePanel.module.css'
import { useAppSelector } from '../../app/hooks'
import {
  AssetBuyButton,
  UpgradeBuyButton,
  DebuggerButtons
} from '../Buttons/Button'

export default function PurchasePanel() {
  const [activeTab, setActiveTab] = useState<'debugger' | 'assets' | 'upgrades'>('assets')
  const assets = useAppSelector((state) => state.assets.items)
  const upgrades = useAppSelector((state) => state.specialUpgrades.items)

  return (
    <aside className={styles.panel}>
      {/* TABS */}
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === 'assets' ? styles.activeTab : ''
            }`}
          onClick={() => setActiveTab('debugger')}
          hidden={true}
        >
          debugger
        </button>

        <button
          className={`${styles.tabButton} ${activeTab === 'assets' ? styles.activeTab : ''
            }`}
          onClick={() => setActiveTab('assets')}
        >
          Ativos
        </button>

        <button
          className={`${styles.tabButton} ${activeTab === 'upgrades' ? styles.activeTab : ''
            }`}
          onClick={() => setActiveTab('upgrades')}
        >
          Upgrades
        </button>
      </div>

      {/* CONTENT */}
      <div className={styles.tabContent}>
        {activeTab === 'debugger' && <DebuggerButtons />}

        {activeTab === 'assets' && (
          <div>
            {(assets || []).map((asset) => (
              <AssetBuyButton key={asset.id} asset={asset} />
            ))}
          </div>
        )}

        {activeTab === 'upgrades' && (
          <div>
            {(upgrades || []).map((upgrade) => (
              <UpgradeBuyButton key={upgrade.id} upgrade={upgrade} />
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}