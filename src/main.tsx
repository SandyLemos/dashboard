import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // <--- ESSA LINHA É OBRIGATÓRIA PARA O ESTILO FUNCIONAR
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)