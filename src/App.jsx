import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import WishList from './pages/WishList';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import OrderConfirmation from './pages/OrderConfirmation';
import StaticPage from './pages/StaticPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<Cart />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />

          <Route path="about" element={<StaticPage slug="about" />} />
          <Route path="careers" element={<StaticPage slug="careers" />} />
          <Route path="press" element={<StaticPage slug="press" />} />
          <Route path="sustainability" element={<StaticPage slug="sustainability" />} />
          <Route path="help" element={<StaticPage slug="help" />} />
          <Route path="track-order" element={<StaticPage slug="track-order" />} />
          <Route path="shipping-returns" element={<StaticPage slug="shipping-returns" />} />
          <Route path="contact" element={<StaticPage slug="contact" />} />
          <Route path="privacy" element={<StaticPage slug="privacy" />} />
          <Route path="terms" element={<StaticPage slug="terms" />} />
          <Route path="cookies" element={<StaticPage slug="cookies" />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;