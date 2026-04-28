import { useState } from 'react'
import styles from './PurchasePanel.module.css'
import type { Asset, SpecialUpgrade } from '../../types/game'
import { addPoints,addPps,addXpDebug,addClickP } from '../../game/debugger'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../app/store'
interface PurchasePanelProps {
  assets: Asset[]
  upgrades: SpecialUpgrade[]
  devPoints: number
  onBuyAsset: (id: number) => void
  onBuySpecialUpgrade: (id: number) => void
}

export default function PurchasePanel({
  assets,
  upgrades,
  devPoints,
  onBuyAsset,
  onBuySpecialUpgrade,
}: PurchasePanelProps) {
  const [activeTab, setActiveTab] = useState<'debugger' | 'assets' | 'upgrades'>('assets')
  const dispatch = useDispatch<AppDispatch>()
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
        {activeTab === 'debugger' && (
          <div>
            <button
              disabled={false}
              className={styles.upgradeButton}
              onClick={() => { dispatch(addPoints(100)) }}
            >
              <div className={styles.upgradeInfo}>
                <div className={styles.assetContent}>
                  <p className={styles.upgradeName}>Adicionar pontos + 100dp</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => { dispatch(addPoints(1000)) }}
              disabled={false}
              className={styles.upgradeButton}
            >
              <div className={styles.upgradeInfo}>
                <div className={styles.assetContent}>
                  <p className={styles.upgradeName}>Adicionar pontos + 1000dp</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => { dispatch(addPoints(50000)) }}
              disabled={false}
              className={styles.upgradeButton}
            >
              <div className={styles.upgradeInfo}>
                <div className={styles.assetContent}>
                  <p className={styles.upgradeName}>Adicionar pontos + 50000dp</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => dispatch(addXpDebug(9))}
              disabled={false}
              className={styles.upgradeButton}
            >
              <div className={styles.upgradeInfo}>
                <div className={styles.assetContent}>
                  <p className={styles.upgradeName}>Adicionar + 9xp</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => { dispatch(addPps(999)) }}
              disabled={false}
              className={styles.upgradeButton}
            >
              <div className={styles.upgradeInfo}>
                <div className={styles.assetContent}>
                  <p className={styles.upgradeName}>Adicionar + 999dp/s</p>
                </div>
              </div>
            </button>
            <button
              onClick={() => { dispatch(addClickP(99)) }}
              disabled={false}
              className={styles.upgradeButton}
            >
              <div className={styles.upgradeInfo}>
                <div className={styles.assetContent}>
                  <p className={styles.upgradeName}>Adicionar 99 Click power</p>
                </div>
              </div>
            </button>
          </div>
        )}
        {/* ASSETS */}
        {activeTab === 'assets' && (
          <div>
            {(assets || []).map((a) => {
              const disabled = devPoints < a.devPointsCost

              return (
                <button
                  key={a.id}
                  onClick={() => onBuyAsset(a.id)}
                  disabled={disabled}
                  className={styles.upgradeButton}
                >
                  <div className={styles.upgradeInfo}>
                    {/* ÍCONE */}
                    <img
                      src={a.image}
                      alt={a.name}
                      className={styles.assetIcon}
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://placehold.co/40x40/020617/6ee7b7?text=?'
                      }}
                    />

                    {/* INFO */}
                    <div className={styles.assetContent}>
                      <p className={styles.upgradeName}>{a.name}</p>

                      <div className={styles.assetStats}>
                        <span className={styles.upgradePps}>
                          +{a.pps} DP/s
                        </span>

                        {a.clickpower > 0 && (
                          <>
                            <span className={styles.divider}>|</span>
                            <span className={styles.clickBonus}>
                              +{a.clickpower.toFixed(1)}/clique
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* COST */}
                    <div className={styles.assetRight}>
                      <p className={styles.upgradeCost}>
                        {a.devPointsCost.toLocaleString()} DP
                      </p>
                      <p className={styles.upgradeOwned}>
                        Possui: {a.owned}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* UPGRADES */}
        {activeTab === 'upgrades' && (
          <div>
            {(upgrades || []).map((u) => {
              const disabled = devPoints < u.cost

              return (
                <button
                  key={u.id}
                  onClick={() => onBuySpecialUpgrade(u.id)}
                  disabled={disabled}
                  className={styles.upgradeButton}
                >
                  <div className={styles.upgradeInfo}>
                    {/* ÍCONE */}
                    <img
                      src={u.image}
                      alt={u.name}
                      className={styles.assetIcon}
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://placehold.co/40x40/020617/6ee7b7?text=?'
                      }}
                    />

                    {/* INFO */}
                    <div className={styles.assetContent}>
                      <p className={styles.upgradeName}>{u.name}</p>

                      <p className={styles.clickBonus}>
                        {u.type === 'clickpower'
                          ? `+${u.value * 100}% /clique`
                          : `+${u.value * 100}% DP/s`}
                      </p>
                    </div>

                    {/* COST */}
                    <div className={styles.assetRight}>
                      <p className={styles.upgradeCost}>
                        {u.cost.toLocaleString()} DP
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </aside>
  )
}