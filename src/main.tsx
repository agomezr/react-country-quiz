import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Quiz from './components/Quiz.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='quiz'>
      <Quiz />
    </div>
  </StrictMode>,
)
