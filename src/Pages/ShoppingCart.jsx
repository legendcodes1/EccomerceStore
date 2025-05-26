import React from "react";
import { useCart } from "../Context/CartContext";
import Navbar from "./Navbar";
import { Trash2, Plus, Minus } from "lucide-react";

export default function ShoppingCart() {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCart();

  // Calculate cart totals
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // Assuming 8% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;

  // Handle quantity updates
  // const handleQuantityChange = (itemId) => {
  //   if (itemId.length >= 1) {
  //     incrementQuantity(itemiD);
  //   }
  // };

  const handleItemIncrement = (item) => {
    incrementQuantity(item.id, item.color);
  };

  const handleDecrementChange = (item) => {
    decrementQuantity(item.id, item.color);
  };

  // Handle item removal
  const handleRemoveItem = (itemId, itemColor) => {
    removeFromCart(itemId, itemColor);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <h2 className="text-xl font-medium text-gray-600 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <a
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="hidden md:grid md:grid-cols-12 bg-gray-100 p-4 text-sm font-medium text-gray-600">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="grid md:grid-cols-12 gap-4 p-4 items-center"
                    >
                      <div className="col-span-6 flex items-center space-x-4">
                        {item.image && (
                          <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                            <img
                              src={item.image || "/api/placeholder/80/80"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium text-gray-800">
                            {item.name}
                          </h3>
                          {item.variant && (
                            <p className="text-sm text-gray-500">
                              {item.variant}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="col-span-2 text-center font-medium">
                        ${item.price.toFixed(2)}
                      </div>

                      <div className="col-span-3 flex items-center justify-center">
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => handleDecrementChange(item)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 border-x border-gray-300 min-w-10 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleItemIncrement(item)}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 text-right">
                        <button
                          onClick={() => handleRemoveItem(item.id, item.color)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-gray-50 flex justify-between items-center">
                  <button
                    onClick={() => clearCart()}
                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                  >
                    Clear Cart
                  </button>
                  <a
                    href="/products"
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-md font-medium mt-6 hover:bg-blue-700">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
