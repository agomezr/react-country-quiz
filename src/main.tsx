import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Quiz from './components/Quiz.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='quiz mx-1'>
      <Quiz />
    </div>
  </StrictMode>,
)
