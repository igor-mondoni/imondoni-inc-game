// hooks/useGameLoop.ts
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { addDevPoints } from '../features/player/playerSlice'

export function useGameLoop() {
  const dispatch = useAppDispatch()
  const pointsPerSecond = useAppSelector(state => state.player.pointsPerSecond)

  useEffect(() => {
    if (pointsPerSecond <= 0) return

    const interval = setInterval(() => {
      dispatch(addDevPoints(pointsPerSecond / 10))
    }, 100)

    return () => clearInterval(interval)
  }, [dispatch, pointsPerSecond])
}