import './assets/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HeroUIProvider } from '@heroui/react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()


import AppRouter from './routes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
       <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </HeroUIProvider>
  </StrictMode>
)
