// src/context/CartContext.js
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    if (!storedCart) return [];

    try {
      const parsed = JSON.parse(storedCart);
      // Ensure each item has a valid price and quantity
      return parsed.map((item) => ({
        ...item,
        price: typeof item.price === "number" ? item.price : 0,
        quantity: typeof item.quantity === "number" ? item.quantity : 1,
      }));
    } catch (e) {
      console.error("Failed to parse stored cart:", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, color) => {
    const existingIndex = cart.findIndex(
      (item) => item.id === product.product_id
    );

    if (existingIndex !== -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      const itemToAdd = {
        id: product.product_id,
        name: product.name,
        price: product.price ?? 0, // fallback
        image: product.image_url || "/api/placeholder/300/300",
        quantity: 1,
      };
      setCart((prev) => [...prev, itemToAdd]);
    }
  };

  const removeFromCart = (productId, color) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const incrementQuantity = (id, color) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (id, color) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
