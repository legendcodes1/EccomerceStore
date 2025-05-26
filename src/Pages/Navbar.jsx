import { ShoppingCart, Heart, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo + Menu Button */}
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold">LOGO</div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="font-medium hover:text-blue-600">
            Home
          </a>
          <a href="/products" className="font-medium hover:text-blue-600">
            Shop
          </a>
          <a href="/products" className="font-medium hover:text-blue-600">
            Categories
          </a>
        </nav>

        {/* Search + Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="p-2">
            <Heart size={20} />
          </button>
          <button
            onClick={() => navigate("/shopping")}
            className="p-2 relative text-gray-800 hover:text-black"
          >
            <ShoppingCart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <a
            href="/"
            className="block font-medium text-gray-700 hover:text-blue-600"
          >
            Home
          </a>
          <a
            href="/products"
            className="block font-medium text-gray-700 hover:text-blue-600"
          >
            Shop
          </a>
          <a
            href="/products"
            className="block font-medium text-gray-700 hover:text-blue-600"
          >
            Categories
          </a>
        </div>
      )}
    </header>
  );
}
