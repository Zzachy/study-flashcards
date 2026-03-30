import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Flashcards from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Flashcards />
  </StrictMode>,
)
