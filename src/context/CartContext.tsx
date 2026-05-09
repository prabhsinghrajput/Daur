"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: string;
  size: string;
  image: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === newItem.id && item.size === newItem.size);
      if (existingItem) {
        return prev.map(item => 
          item.id === newItem.id && item.size === newItem.size 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => 
      item.id === id && item.size === size 
        ? { ...item, quantity }
        : item
    ));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
