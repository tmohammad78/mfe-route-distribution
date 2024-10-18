import React from 'react';
import products from '../../data/products';
import ProductCard from "../../components/ProductCard/index";
import Toast from '../../components/Toast';
import { useCart } from '../../context/CartContext';

const ProductPage = () => {
  const { toast } = useCart();

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      {toast.visible && <Toast message={toast.message} onClose={() => {}} />}
    </div>
  );
};

export default ProductPage;
