import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

function init() {
  try {
    const saved = localStorage.getItem('wishlistItems');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to parse wishlist from localStorage', error);
    return [];
  }
}

function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(init);

  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const isInWishlist = (productId) => wishlistItems.some((item) => item.id === productId);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  const clearWishlist = () => setWishlistItems([]);

  const value = {
    wishlistItems,
    totalWishlistItems: wishlistItems.length,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { WishlistProvider, useWishlist };