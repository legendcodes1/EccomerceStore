// src/context/CartContext.js
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, color) => {
    // Check if item already exists (same id & color)
    const existingIndex = cart.findIndex(
      (item) =>
        item.id === product.product_id &&
        item.color === (color || product.colors[0])
    );

    if (existingIndex !== -1) {
      // If exists, increase quantity by 1
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      // Else add new item
      const itemToAdd = {
        id: product.product_id,
        name: product.name,
        price: product.inventory[0]?.list_price,
        image: product.images[0]?.image_url || "/api/placeholder/300/300",
        color: color || product.colors[0],
        quantity: 1,
      };
      setCart((prev) => [...prev, itemToAdd]);
    }
  };

  const removeFromCart = (productId, color) => {
    const remainingItems = cart.filter(
      (item) => !(item.id === productId && item.color === color)
    );

    setCart(remainingItems);
  };

  const clearCart = (product) => {
    const clearItems = [];
    setCart(clearItems);
  };

  // Increment quantity for an existing cart item
  const incrementQuantity = (id, color) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrement quantity for an existing cart item
  const decrementQuantity = (id, color) => {
    setCart(
      (prev) =>
        prev
          .map((item) =>
            item.id === id && item.color === color
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove if quantity is 0
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

// This is the missing piece you need to add:
export function useCart() {
  return useContext(CartContext);
}
