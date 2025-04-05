import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/styles/global.scss'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from 'react-query'

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
