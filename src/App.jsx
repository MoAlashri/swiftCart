import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'  
import WishList from './pages/WishList'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import NotFound from './pages/NotFound'
import Layout from './components/layout/Layout'


function App() {
  return (
    <BrowserRouter>
      <Routes >
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home />}/>
        <Route path="shop" element={<Shop />}/>
        <Route path="productDetails/:id" element={<ProductDetails />}/>
        <Route path="cart" element={<Cart />}/>
        <Route path="wishlist" element={<WishList />}/>
        <Route path="checkout" element={<Checkout />}/>
      </Route>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>

  )
}

export default App
