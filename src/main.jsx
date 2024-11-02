import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Header.jsx'
import MainC from './MainC.jsx'
import Horizontal from './Horizontal.jsx'
import Footer from './Footer.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <MainC />
    <Horizontal />
    <Footer />
  </StrictMode>,
)
