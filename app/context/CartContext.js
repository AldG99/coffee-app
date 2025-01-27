import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = item => {
    setCartItems(prevItems => {
      const exists = prevItems.find(cartItem => cartItem.id === item.id);
      if (exists) return prevItems;
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = itemId => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems(prevItems =>
      prevItems.map(item => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
