import React from "react"
import {
  Routes,
  Route,
} from "react-router-dom";
import ProductPage from "./pages/products";
import Product from "./pages/product";
import { CartProvider, useCart } from "./context/CartContext";


const CartStatus = () => {
  const { getTotalItems } = useCart();
  return (
    <div className="text-right p-4">
      <span className="font-bold">Items in Cart: {getTotalItems()}</span>
    </div>
  );
};

function App() {
  let defaultPath = process.env.PUBLIC_URL

  return (
      <div className="mx-20">
        <div>
          <h1 className="text-center text-gray-700">Welcome To Store</h1>
        </div>
        <CartProvider>
          <CartStatus />
          <Routes>
            <Route exact path={defaultPath} element={<ProductPage />} />
            <Route path={defaultPath + "/:id"} element={<Product />} />
          </Routes>
        </CartProvider>
      </div>
  );
}

export default App;
