import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'
import AppRouter from './routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <AppRouter /> 
    </HeroUIProvider>{' '}
  </StrictMode>
)
