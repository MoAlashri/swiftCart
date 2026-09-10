function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_TO_CART':{
      const {product, quantity} = action.payload;
      const existingItem = state.find(item => item.id === product.id);

      if(existingItem) {
        return state.map(item => 
          item.id === product.id 
          ? {...item, quantity: item.quantity + quantity}
          : item
        )}
      return [...state, {...product, quantity}]
    };

    case 'REMOVE_FROM_CART': {
      return state.filter(item => item.id !== action.payload);
    };

    case 'UPDATE_QUANTITY': {
      const { productId, newQuantity } = action.payload;

      if(newQuantity < 1) return state;
      return state.map(item => 
        item.id === productId
        ? {...item, quantity: newQuantity}
        : item
      )}

    case 'CLEAR_CART': {
      return [];
    }
    default:
      return state;
    
  }
}

export default cartReducer;