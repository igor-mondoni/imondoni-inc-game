// playerStorageService.ts
import { db, type PlayerStatus } from "../database/db";


const MAIN_PROFILE_ID = "main-profile";

export async function savePlayer(player: PlayerStatus) {
  await db.player.put({
    ...player,
    profileId: MAIN_PROFILE_ID,
  });
}

export async function loadPlayer() {
  return await db.player.get(MAIN_PROFILE_ID);
}

export async function deletePlayerSave() {
  await db.player.delete(MAIN_PROFILE_ID);
}