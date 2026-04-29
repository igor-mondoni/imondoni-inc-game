// db.ts
import { Dexie, type EntityTable } from "dexie"
import type {PlayerStatus} from '../types/game'

const db = new Dexie("PlayerDatabase") as Dexie & {
  player: EntityTable<
    PlayerStatus,
    "profileId"
  >
}

db.version(1).stores({
  player: "profileName,profileId,profileCodeUser,devPointsOwned,clickpower,clickedTimes,pointsPerSecond,ownedItens,ownedUpgrades,experienceOwned,currentLevel",
})

export type { PlayerStatus }
export { db }
