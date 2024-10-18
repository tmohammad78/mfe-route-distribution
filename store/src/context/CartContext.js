import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ message: '', visible: false });

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);

    showToast(`${product.name} added to cart!`);

    const addToCartEvent = new CustomEvent('add_to_cart', { cart: { count: getTotalItems() } });

    window.dispatchEvent(addToCartEvent);
  };

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 5000);
  };


  const getTotalItems = () => {
    return cart.length;
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, getTotalItems, toast }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
