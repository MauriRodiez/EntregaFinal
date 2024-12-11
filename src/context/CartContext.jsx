import React, { createContext, useState, useContext } from "react";

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Verifica si el producto ya está en el carrito
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        return prevItems.map(item => 
          item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 } // Aumentar cantidad
          : item
        );
      } else {
        // Si no está en el carrito, agrega el producto con una cantidad inicial de 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcula el total de productos en el carrito (cantidad total de productos)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, totalItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCart = () => useContext(CartContext);
