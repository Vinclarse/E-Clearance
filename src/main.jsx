import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SignatoryApp from './SignatoryApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignatoryApp />
  </StrictMode>,
)
