import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [worker, setWorker] = useState(null);

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
    const myWorker = new Worker("http://localhost:8000/sharedWorker.js");
    console.log(myWorker,'myWorker myWorker this is worker');
    setWorker(myWorker);

    return () => {
      myWorker.terminate();
    };
  }, []);

  useEffect(() => {
    if(worker) { 
      console.log(worker,'this is worker');
      
      worker.postMessage({
        data: {
          items: cart.length
        }
      });
    }
  }, [cart])


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
