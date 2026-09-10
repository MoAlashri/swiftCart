import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ThemeProvider>
      <CartProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </CartProvider>
    </ThemeProvider>
  </StrictMode>,
)
