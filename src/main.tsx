import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {AppRouter} from '../src/router/index'
import { store } from './app/store'
import './styles/global.css'
import { Provider } from 'react-redux'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <AppRouter />
      </Provider>
  </StrictMode>,
)
