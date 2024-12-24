import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx';
import { QueryClientProvider , QueryClient } from '@tanstack/react-query';

const Client = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={Client} >
          <App />
      </QueryClientProvider>
  </StrictMode>,
)
