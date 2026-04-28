import type { AppDispatch } from '../app/store'
import {
  handleAddXpPoint
} from '../features/game/gameThunks'
import {
    addClickPower,
    addDevPoints,
    addPointsPerSecond
} from '../features/player/playerSlice'

export const addPoints = (point: number) => {
    return (dispatch: AppDispatch) => {
        dispatch(addDevPoints(point))
    }
}

export const addPps = (pps: number) => {
    return (dispatch: AppDispatch) => {
        dispatch(addPointsPerSecond(pps))
    }
}
export const addXpDebug = (xp: number) => {
    return (dispatch: AppDispatch) => {
        dispatch(handleAddXpPoint(xp))
    }
}

export const addClickP = (power: number) => {
    return (dispatch: AppDispatch) => {
        dispatch(addClickPower(power))
    }
}