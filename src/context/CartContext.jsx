import { createContext, useContext, useReducer, useEffect } from 'react';
import cartReducer from './CartReducer';

const CartContext = createContext();

function init(initialState) {
  try{
    const savedCart = localStorage.getItem("cartItems");
    return savedCart? JSON.parse(savedCart) : [];
  } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return initialState;
    }
}

function CartProvider({children}) {
  const [cartItems, dispatch] = useReducer(cartReducer, [], init);


  useEffect(()=>{
    localStorage.setItem("cartItems", JSON.stringify(cartItems))
  },[cartItems])

  

  const addToCart = (product, quantity = 1) => {
    dispatch({type: 'ADD_TO_CART', payload: {product, quantity}});
  }

  const removeFromCart = (productId) => {
    dispatch({type: 'REMOVE_FROM_CART', payload: productId})
  }

  const updateQuantity = (productId, newQuantity) => {
    dispatch({type: 'UPDATE_QUANTITY', payload: {productId, newQuantity}})
  }

  const clearCart= () => {
    dispatch({type: 'CLEAR_CART'})
  }

  const totalItems = cartItems.reduce((total, item)=> total + item.quantity,0 );
  const totalPrice = cartItems.reduce((sum, item)=> sum + item.price * item.quantity,0);

  const value = {
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      cartItems, 
      totalItems, 
      totalPrice 
    }
  
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

function useCart() {
  const context = useContext(CartContext);
  if(!context) {
    throw new Error("useCart must be used within a CartProvider");
  } 
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { CartProvider, useCart};