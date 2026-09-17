import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
 import { ToastProvider } from './context/ToastContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ToastProvider>
  <CartProvider>
    <ThemeProvider>
      <WishlistProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </WishlistProvider>
    </ThemeProvider>
  </CartProvider>
</ToastProvider>
  </StrictMode>,
)
