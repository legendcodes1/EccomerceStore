import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Mock authentication state for UI demo - replace with your auth logic
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
  });

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
        <nav className="hidden md:flex space-x-10">
          <a href="/" className="font-medium hover:text-blue-600">
            Home
          </a>
          <a href="/products" className="font-medium hover:text-blue-600">
            Shop
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

          {/* Authentication Section */}
          {isSignedIn ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {user?.name?.charAt(0) || "U"}
                </div>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                    <User size={16} />
                    <span>Profile</span>
                  </button>

                  {/* Admin Dashboard - Only show for admin users */}
                  {user?.role === "admin" && (
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                      <Settings size={16} />
                      <span>Admin Dashboard</span>
                    </button>
                  )}

                  <hr className="my-1" />

                  <button
                    onClick={() => setIsSignedIn(false)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSignedIn(true)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Sign In
              </button>
            </div>
          )}
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

          {/* Mobile Auth Section */}
          {isSignedIn ? (
            <div className="pt-4 border-t">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  {user?.name?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              <button className="block w-full text-left py-2 text-sm text-gray-700 hover:text-blue-600">
                Profile
              </button>

              {user?.role === "admin" && (
                <button className="block w-full text-left py-2 text-sm text-gray-700 hover:text-blue-600">
                  Admin Dashboard
                </button>
              )}

              <button
                onClick={() => setIsSignedIn(false)}
                className="block w-full text-left py-2 text-sm text-red-600 hover:text-red-700"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t space-y-2">
              <button
                onClick={() => setIsSignedIn(true)}
                className="block w-full text-left py-2 text-sm text-gray-700 hover:text-blue-600"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
