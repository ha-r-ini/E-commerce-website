import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { FilterProvider } from './context/FilterContext.jsx'
import { ToastContainer, toast } from 'react-toastify';
import ScrollToTop from './components/ScrollToTop.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CartProvider>
          <FilterProvider>
            <App />
            <ScrollToTop />
            <ToastContainer />
          </FilterProvider>
        </CartProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
