import React from 'react';
import { useCart } from  "../../context/CartContext";
import { useState } from "react";
import Style from "./Card.module.css"

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleError = () => {
    setImageError(true);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-md">
      <div className={`w-full h-32 rounded ${imageError ? Style.placeHolder : 'object-cover'}`}>
        {!imageError ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="bg-gray-600 w-full h-32 object-cover rounded" 
            onError={handleError}
          />
        ) : (
          <span>Image not available</span>
        )}
      </div>
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-gray-700 mt-1">{product.description}</p>
      <p className="text-gray-500 mt-1 text-sm">{product.details}</p>
      <button 
        onClick={handleAddToCart}
        className="mt-4 cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
