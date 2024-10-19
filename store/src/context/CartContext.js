import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const worker = new SharedWorker('http://localhost:8000/sharedWorker.js');

  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ message: '', visible: false });

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    showToast(`${product.name} added to cart!`);
  };

  const showToast = (message) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast({ message: '', visible: false });
    }, 5000);
  };
  
  useEffect(() => {
    worker.port.start();

    worker.port.postMessage({ type: 'setCartTotal' , data: cart.length });


    worker.port.postMessage({ 
      type: 'publish', 
      event: 'cartUpdated', 
      data: {
        count: cart.length
      } 
    });

    // worker.port.onmessage = (event) => {
    //   console.log('Result from worker:', event);
    // };

    return () => {
      worker.port.close();
    };

  }, [cart,worker.port]);


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
