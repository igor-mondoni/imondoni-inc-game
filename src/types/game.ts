export interface Asset {
  id: number
  category: string[]
  name: string
  originalCostReal: number
  originalCostDevPoints: number
  devPointsCost: number
  pps: number
  owned: number
  clickpower: number
  image: string
}

export interface SpecialUpgrade {
  id: number
  name: string
  type: 'clickpower' | 'pps'
  value: number
  cost: number
  image: string
}

export interface PlayerStatus {
  devPointsOwned: number
  clickpower: number
  clickedTimes: number
  pointsPerSecond: number
  ownedItens: number[]
  ownedUpgrades: number[]
  experienceOwned: number
  currentLevel: number
}