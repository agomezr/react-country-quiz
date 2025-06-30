import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import App from './App.tsx'
import Quiz from './components/Quiz.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Quiz />
  </StrictMode>,
)
