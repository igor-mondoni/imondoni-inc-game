import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import type { AppDispatch } from '../app/store'
import { handleLoadPlayer } from '../features/game/gameThunks'

export function useGameInitializer() {
  const dispatch = useDispatch<AppDispatch>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function initializeGame() {
      await dispatch(handleLoadPlayer())
      setIsLoading(false)
    }

    initializeGame()
  }, [dispatch])

  return {
    isLoading,
  }
}