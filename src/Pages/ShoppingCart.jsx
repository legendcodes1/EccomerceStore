import React from "react";
import { useCart } from "../Context/CartContext";
import Navbar from "./Navbar";
import { useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  Heart,
  ShoppingCart,
  Star,
  Shield,
  Truck,
  RefreshCw,
  CreditCard,
  Lock,
  CheckCircle,
  Percent,
} from "lucide-react";

export default function ShoppingCartPage() {
  const {
    cart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = useCart();

  // Calculate cart totals
  const subtotal = cart.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );
  const tax = subtotal * 0.08; // Assuming 8% tax
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal + tax + shipping;
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const promoDiscountAmount = subtotal * (promoDiscount / 100);
  const discountedSubtotal = subtotal - promoDiscountAmount;

  const handleItemIncrement = (item) => {
    incrementQuantity(item.id, item.color);
  };

  const handleDecrementChange = (item) => {
    decrementQuantity(item.id, item.color);
  };

  const handleRemoveItem = (itemId, itemColor) => {
    removeFromCart(itemId, itemColor);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="fill-yellow-400 text-yellow-400 w-4 h-4" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            className="fill-yellow-400 text-yellow-400 w-4 h-4 opacity-50"
          />
        );
      } else {
        stars.push(<Star key={i} className="text-gray-300 w-4 h-4" />);
      }
    }
    return stars;
  };

  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
      setPromoDiscount(10);
    } else if (promoCode.toLowerCase() === "welcome20") {
      setPromoApplied(true);
      setPromoDiscount(20);
    } else {
      alert("Invalid promo code");
    }
  };

  const recommendedProducts = [
    {
      id: "rec1",
      name: "Classic Polo Shirt",
      price: 39.99,
      originalPrice: 49.99,
      image:
        "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 234,
      discount: 20,
    },
    {
      id: "rec2",
      name: "Designer Sunglasses",
      price: 159.99,
      originalPrice: 199.99,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 89,
      discount: 20,
    },
    {
      id: "rec3",
      name: "Leather Wallet",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 156,
      discount: 0,
    },
    {
      id: "rec4",
      name: "Smart Watch",
      price: 299.99,
      originalPrice: 399.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 445,
      discount: 25,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="text-gray-400 mb-6">
              <ShoppingCart size={64} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Your Items
                  </h2>
                </div>

                <div className="divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div
                      key={`${item.id}-${item.color || "default"}`}
                      className="p-6 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-start space-x-4">
                        {/* Product Image */}
                        <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                          <img
                            src={item.image || "/api/placeholder/96/96"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                {item.name}
                              </h3>
                              {item.brand && (
                                <p className="text-sm text-gray-600 mb-2">
                                  {item.brand}
                                </p>
                              )}
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                {item.color && <span>Color: {item.color}</span>}
                                {item.size && <span>Size: {item.size}</span>}
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                handleRemoveItem(item.id, item.color)
                              }
                              className="text-gray-400 hover:text-red-500 transition p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>

                          {/* Price and Quantity */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="text-xl font-bold text-gray-900">
                              $
                              {(
                                (item.price || 0) * (item.quantity || 1)
                              ).toFixed(2)}
                              <span className="text-sm font-normal text-gray-600 ml-2">
                                ${(item.price || 0).toFixed(2)} each
                              </span>
                            </div>

                            <div className="flex items-center bg-gray-100 rounded-lg">
                              <button
                                onClick={() => handleDecrementChange(item)}
                                className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-l-lg transition"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-4 py-2 font-medium min-w-12 text-center">
                                {item.quantity || 1}
                              </span>
                              <button
                                onClick={() => handleItemIncrement(item)}
                                className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-r-lg transition"
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cart Actions */}
                <div className="p-6 bg-gray-50 flex justify-between items-center">
                  <button
                    onClick={() => clearCart()}
                    className="text-red-600 hover:text-red-800 font-medium transition"
                  >
                    Clear Cart
                  </button>
                  <button className="text-blue-600 hover:text-blue-800 font-medium transition">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>

                {/* Promo Code */}
                <div className="mb-6">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      disabled={promoApplied}
                    />
                    <button
                      onClick={handlePromoCode}
                      disabled={promoApplied}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <div className="mt-2 flex items-center text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Promo code applied ({promoDiscount}% off)
                    </div>
                  )}
                </div>

                {/* Summary Details */}
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({promoDiscount}%)</span>
                      <span>-${promoDiscountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Free Shipping Progress */}
                {shipping > 0 && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center text-blue-700 text-sm mb-2">
                      <Truck className="w-4 h-4 mr-2" />
                      Add ${(100 - discountedSubtotal).toFixed(2)} more for free
                      shipping
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            (discountedSubtotal / 100) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Trust Badges */}
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div className="text-green-600">
                    <Shield className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-xs">Secure</span>
                  </div>
                  <div className="text-blue-600">
                    <Truck className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-xs">Fast Ship</span>
                  </div>
                  <div className="text-purple-600">
                    <RefreshCw className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-xs">Easy Return</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold mt-6 hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center justify-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Secure Checkout
                </button>

                {/* Payment Methods */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 mb-2">We accept</p>
                  <div className="flex justify-center items-center gap-2">
                    <CreditCard className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      Visa, Mastercard, PayPal
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommendations Section */}
        {cart.length > 0 && (
          <div className="mt-12">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  You might also like
                </h2>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View all
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl bg-gray-100 mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                      />

                      {product.discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                          <Percent className="w-3 h-3 mr-1" />
                          {product.discount}% OFF
                        </div>
                      )}

                      <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow hover:bg-white transition opacity-0 group-hover:opacity-100">
                        <Heart size={16} className="text-gray-600" />
                      </button>

                      <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center text-sm">
                          <ShoppingCart size={14} className="mr-2" />
                          Quick Add
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-xs ml-1 text-gray-500">
                          ({product.reviews})
                        </span>
                      </div>

                      <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">
                          ${product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
