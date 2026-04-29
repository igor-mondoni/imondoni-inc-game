import { BrowserRouter, Routes, Route } from "react-router";

import GameLayout from "../layout/App"
import App from "../pages/App"

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameLayout />}>
          <Route path="home" element={<App />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}