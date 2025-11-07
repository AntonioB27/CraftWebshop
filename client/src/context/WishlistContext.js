import React, { createContext, useContext, useEffect, useState } from 'react';

const WishlistContext = createContext(null);
export function useWishlist() { return useContext(WishlistContext); }

export function WishlistProvider({ user, children }) {
  const [wishlist, setWishlist] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(false);

  useEffect(() => {
    if (user) loadWishlist();
    else setWishlist([]);
  }, [user]);

  async function loadWishlist() {
    try {
      setLoadingWishlist(true);
      const token = localStorage.getItem('token');
      const res = await fetch('/api/wishlist', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setWishlist(await res.json());
      else setWishlist([]);
    } catch {
      setWishlist([]);
    } finally {
      setLoadingWishlist(false);
    }
  }

  async function addToWishlist(beerId) {
    if (!user) return;
    const token = localStorage.getItem('token');
    const res = await fetch('/api/wishlist/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ beerId })
    });
    if (res.ok) setWishlist(await res.json());
  }

  async function removeFromWishlist(beerId) {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/wishlist/remove/${beerId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) setWishlist(await res.json());
  }

  async function toggleWishlist(beerId) {
    const exists = wishlist.some(b => b._id === beerId);
    if (exists) await removeFromWishlist(beerId);
    else await addToWishlist(beerId);
    alert(exists ? 'Uklonjeno iz wishlist.' : 'Dodano u wishlist.');
  }

  async function clearWishlist() {
    const token = localStorage.getItem('token');
    const res = await fetch('/api/wishlist/clear', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) setWishlist([]);
  }

  const value = {
    wishlist,
    loadingWishlist,
    loadWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    count: wishlist.length
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}