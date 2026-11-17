import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => storageService.getWishlist());

  const toggleWishlist = (item) => {
    const updated = storageService.toggleWishlist(item);
    setWishlist(updated);
    return updated.some(w => w.id === item.id);
  };

  const isWishlisted = (itemId) => {
    return wishlist.some(w => w.id === itemId);
  };

  const removeFromWishlist = (itemId) => {
    const updated = wishlist.filter(w => w.id !== itemId);
    localStorage.setItem('travelverse_wishlist', JSON.stringify(updated));
    setWishlist(updated);
  };

  return (
    <WishlistContext.Provider value={{
      wishlist,
      wishlistCount: wishlist.length,
      toggleWishlist,
      isWishlisted,
      removeFromWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}

