
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Club } from '@/data/clubData';

export interface CartItem {
  clubId: string;
  clubName: string;
  quantity: number;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (club: Club, quantity: number) => void;
  removeFromCart: (clubId: string) => void;
  updateQuantity: (clubId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((club: Club, quantity: number) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.clubId === club.id);
      if (existingItem) {
        return currentItems.map(item =>
          item.clubId === club.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...currentItems, {
        clubId: club.id,
        clubName: club.name,
        quantity,
        price: 50 // Fixed price for now, you might want to make this dynamic
      }];
    });
  }, []);

  const removeFromCart = useCallback((clubId: string) => {
    setItems(currentItems => currentItems.filter(item => item.clubId !== clubId));
  }, []);

  const updateQuantity = useCallback((clubId: string, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.clubId === clubId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      total
    }}>
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
