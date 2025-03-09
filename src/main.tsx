import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css'

import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App2 />
  </StrictMode>,
)





export default function App2() {
const queryClient = new QueryClient();

   return (
     <QueryClientProvider client={queryClient}>
       <App />
     </QueryClientProvider>
   )
}