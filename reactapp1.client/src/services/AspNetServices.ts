
import { Club } from '@/data/clubData';
import { CartItem } from '@/context/CartContext';

// Base API URL - configured for local development
const API_BASE_URL = 'https://localhost:7058/api';

// Types that match the backend models
export interface AspNetCartItem {
  id?: string;
  clubId: string;
  userId: string;
  quantity: number;
  price: number;
  dateAdded?: string;
}

export interface AspNetTicket {
  id?: string;
  clubId: string;
  userId: string;
  orderId?: string;
  quantity: number;
  price: number;
  purchaseDate?: string;
  status?: string;
}

export interface AspNetOrder {
  id?: string;
  userId: string;
  tickets: AspNetTicket[];
  totalAmount: number;
  orderDate?: string;
  status?: string;
  paymentMethod: string;
}

// Service class for interacting with the ASP.NET backend
export class AspNetService {
  // Cart related methods
  static async getUserCart(userId: string): Promise<AspNetCartItem[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch cart');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      return [];
    }
  }

  static async addToCart(cartItem: AspNetCartItem): Promise<AspNetCartItem | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem)
      });
      if (!response.ok) throw new Error('Failed to add to cart');
      return await response.json();
    } catch (error) {
      console.error('Error adding to cart:', error);
      return null;
    }
  }

  static async updateCartItem(id: string, quantity: number, userId: string, clubId: string, price: number): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, quantity, userId, clubId, price })
      });
      return response.ok;
    } catch (error) {
      console.error('Error updating cart item:', error);
      return false;
    }
  }

  static async removeCartItem(id: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/${id}`, {
        method: 'DELETE'
      });
      return response.ok;
    } catch (error) {
      console.error('Error deleting cart item:', error);
      return false;
    }
  }

  static async clearCart(userId: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/cart/user/${userId}`, {
        method: 'DELETE'
      });
      return response.ok;
    } catch (error) {
      console.error('Error clearing cart:', error);
      return false;
    }
  }

  // Order and ticket related methods
  static async createOrder(order: AspNetOrder): Promise<AspNetOrder | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      if (!response.ok) throw new Error('Failed to create order');
      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  }

  static async getUserOrders(userId: string): Promise<AspNetOrder[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      return await response.json();
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  static async getUserTickets(userId: string): Promise<AspNetTicket[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/orders/tickets/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch tickets');
      return await response.json();
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return [];
    }
  }

  // Helper method to convert frontend cart items to backend format
  static convertCartItemsToAspNet(
    cartItems: CartItem[], 
    userId: string
  ): AspNetCartItem[] {
    return cartItems.map(item => ({
      clubId: item.clubId,
      userId: userId,
      quantity: item.quantity,
      price: item.price
    }));
  }

  // Helper method to prepare an order from cart items
  static prepareOrderFromCart(
    cartItems: CartItem[], 
    userId: string, 
    paymentMethod: string
  ): AspNetOrder {
    const tickets = cartItems.map(item => ({
      clubId: item.clubId,
      userId: userId,
      quantity: item.quantity,
      price: item.price
    }));
    
    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    return {
      userId: userId,
      tickets: tickets,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod
    };
  }
}
