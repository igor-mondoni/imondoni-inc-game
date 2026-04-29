import styles from './buttons.module.css'
import type { Asset, SpecialUpgrade } from '../../types/game'
import { useAppSelector } from '../../app/hooks'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../../app/store'
import {
    handleBuyAsset,
    handleBuySpecialUpgrade,
} from '../../features/game/gameThunks'
import { addClickP, addPoints, addPps, addXpDebug } from '../../game/debugger'

const FallbackImage = 'https://placehold.co/40x40/020617/6ee7b7?text=?'

export function DebuggerButtons() {
  const dispatch = useDispatch<AppDispatch>()

  const debugButtons = [
    {
      label: 'Adicionar pontos + 100dp',
      action: () => dispatch(addPoints(100)),
    },
    {
      label: 'Adicionar pontos + 1000dp',
      action: () => dispatch(addPoints(1000)),
    },
    {
      label: 'Adicionar pontos + 50000dp',
      action: () => dispatch(addPoints(50000)),
    },
    {
      label: 'Adicionar + 9xp',
      action: () => dispatch(addXpDebug(9)),
    },
    {
      label: 'Adicionar + 999dp/s',
      action: () => dispatch(addPps(999)),
    },
    {
      label: 'Adicionar 99 Click power',
      action: () => dispatch(addClickP(99)),
    },
  ]

  return (
    <div>
      {debugButtons.map((button) => (
        <button
          key={button.label}
          disabled={false}
          className={styles.upgradeButton}
          onClick={button.action}
        >
          <div className={styles.upgradeInfo}>
            <div className={styles.assetContent}>
              <p className={styles.upgradeName}>{button.label}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export function AssetBuyButton({ asset }: { asset: Asset }) {
    const dispatch = useDispatch<AppDispatch>()

    const devPoints = useAppSelector(
        (state) => state.player.devPointsOwned
    )

    const disabled = devPoints < asset.devPointsCost

    return (
        <button
            onClick={() => dispatch(handleBuyAsset(asset.id))}
            disabled={disabled}
            className={styles.upgradeButton}
        >
            <div className={styles.upgradeInfo}>
                <img
                    src={asset.image}
                    alt={asset.name}
                    className={styles.assetIcon}
                    onError={(e) => {
                        e.currentTarget.src = FallbackImage
                    }}
                />

                <div className={styles.assetContent}>
                    <p className={styles.upgradeName}>{asset.name}</p>

                    <div className={styles.assetStats}>
                        <span className={styles.upgradePps}>
                            +{asset.pps} DP/s
                        </span>

                        {asset.clickpower > 0 && (
                            <>
                                <span className={styles.divider}>|</span>
                                <span className={styles.clickBonus}>
                                    +{asset.clickpower.toFixed(1)}/clique
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className={styles.assetRight}>
                    <p className={styles.upgradeCost}>
                        {asset.devPointsCost.toLocaleString()} DP
                    </p>

                    <p className={styles.upgradeOwned}>
                        Possui: {asset.owned}
                    </p>
                </div>
            </div>
        </button>
    )
}

export function UpgradeBuyButton({ upgrade }: { upgrade: SpecialUpgrade }) {
    const dispatch = useDispatch<AppDispatch>()

    const devPoints = useAppSelector(
        (state) => state.player.devPointsOwned
    )

    const disabled = devPoints < upgrade.cost

    return (
        <button
            onClick={() => dispatch(handleBuySpecialUpgrade(upgrade.id))}
            disabled={disabled}
            className={styles.upgradeButton}
        >
            <div className={styles.upgradeInfo}>
                <img
                    src={upgrade.image}
                    alt={upgrade.name}
                    className={styles.assetIcon}
                    onError={(e) => {
                        e.currentTarget.src = FallbackImage
                    }}
                />

                <div className={styles.assetContent}>
                    <p className={styles.upgradeName}>{upgrade.name}</p>

                    <p className={styles.clickBonus}>
                        {upgrade.type === 'clickpower'
                            ? `+${upgrade.value * 100}% /clique`
                            : `+${upgrade.value * 100}% DP/s`}
                    </p>
                </div>

                <div className={styles.assetRight}>
                    <p className={styles.upgradeCost}>
                        {upgrade.cost.toLocaleString()} DP
                    </p>
                </div>
            </div>
        </button>
    )
}