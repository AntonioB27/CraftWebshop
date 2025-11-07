import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
export function useCart() { return useContext(CartContext); }

export function CartProvider({ user, children }) {
  const [cart, setCart] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);

  useEffect(() => {
    if (user) loadCart();
    else setCart([]);
  }, [user]);

  async function loadCart() {
    if (!user) return;
    try {
      setLoadingCart(true);
      const token = localStorage.getItem('token');
      const res = await fetch('/api/cart', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setCart(await res.json());
      else setCart([]);
    } catch {
      setCart([]);
    } finally {
      setLoadingCart(false);
    }
  }

  async function addToCart(beerId, quantity = 1) {
    if (!user) return { ok: false, message: 'Not logged in' };
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ beerId, quantity })
      });
      if (!res.ok) return { ok: false, message: 'Add failed' };
      setCart(await res.json());
      return { ok: true };
    } catch { return { ok: false, message: 'Network error' }; }
  }

  async function updateQuantity(beerId, quantity) {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/cart/update/${beerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ quantity })
      });
      if (res.ok) setCart(await res.json());
    } catch {}
  }

  async function removeItem(beerId) {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/cart/remove/${beerId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setCart(await res.json());
    } catch {}
  }

  async function clearCart() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/cart/clear', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) setCart([]);
    } catch {}
  }

  async function purchaseCart() {
    if (cart.length === 0) return;
    const summary = cart.map(i => `${i.beer.name} x ${i.quantity}`).join('\n');
    alert(`Kupnja uspješna!\n\nKupljeno:\n${summary}`);
    await clearCart();
  }

  const value = {
    cart,
    loadingCart,
    loadCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    purchaseCart,
    totalItems: cart.reduce((s, i) => s + i.quantity, 0),
    totalPrice: cart.reduce((s, i) => s + (i.beer.priceEur * i.quantity), 0)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}