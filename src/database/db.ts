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
  player: "profileId, profileName, profileCodeUser",
});

export type { PlayerStatus }
export { db }
