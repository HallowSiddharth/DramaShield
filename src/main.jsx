import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import MainC from './MainC.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <MainC />
  </StrictMode>,
)
