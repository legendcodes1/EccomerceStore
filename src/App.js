import React from "react";
import { CartProvider } from "./Context/CartContext";
import ProductDetails from "./Pages/ProductsDetails";
import Products from "./Pages/Products";
import Header from "./Components/Header";
import Homepage from "./Pages/Homepage";
import ShoppingCart from "./Pages/ShoppingCart";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Components/AdminDashboard";

function App() {
  return (
    <Router>
      {" "}
      {/* Router should wrap the entire app */}
      <CartProvider>
        <div className="min-h-screen bg-gray-100 p-4">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/shopping" element={<ShoppingCart />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
