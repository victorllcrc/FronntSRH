import React, { createContext, useContext, useState } from 'react';

// Contexto para manejar el carrito de compras
const ShoppingContext = createContext();

export const usePurchases = () => useContext(ShoppingContext); // Asegúrate de que el hook esté bien definido

export const ShoppingProvider = ({ children }) => {
  const [shopping, setShopping] = useState([]); // Estado para el carrito

  // Función para agregar un curso al carrito
  const addPurchase = (course) => {
    if (course && course.id) {
      setShopping((prevShopping) => [...prevShopping, course]); // Agregar el curso al carrito
    } else {
      console.warn("Hospedaje inválido, no se puede agregar."); // Advertencia si el curso es inválido
    }
  };

  return (
    <ShoppingContext.Provider value={{ shopping, addPurchase }}>
      {children}
    </ShoppingContext.Provider>
  );
};
