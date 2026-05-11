import { BrowserRouter, Routes, Route } from "react-router";

import GameLayout from "../layout/App"
import App from "../pages/App"
import {useGameInitializer} from "../hooks/useGameInitializer"

export const AppRouter = () => {
  const { isLoading } = useGameInitializer()

  if (isLoading) {
    return <div>Carregando...</div>
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameLayout />}>
          <Route index element={<App />} />
          <Route path="home" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}