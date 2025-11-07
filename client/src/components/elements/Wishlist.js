import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../static/styles/wishlist.css';
import { useWishlist } from '../../context/WishlistContext';

export default function Wishlist({ user }) {
  const [open, setOpen] = useState(false);
  const { wishlist, loadingWishlist, removeFromWishlist, clearWishlist, count } = useWishlist();
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
  if (!user) return null;

  const imgSrc = (b) => {
    const f = b?.imageUrl ? b.imageUrl.split('/').pop() : '1.jpg';
    return `${API_BASE}/static/images/beers/${f}`;
  };

  return (
    <div className="wishlist-widget">
      <button className="wishlist-toggle" onClick={() => setOpen(!open)}>❤ ({count})</button>
      {open && (
        <div className="wishlist-dropdown">
          <div className="wishlist-header">
            <h3>Wishlist</h3>
            <button className="wishlist-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="wishlist-content">
            {loadingWishlist ? (
              <div className="wishlist-loading">Učitavanje...</div>
            ) : wishlist.length === 0 ? (
              <div className="wishlist-empty">Lista je prazna</div>
            ) : (
              <>
                <div className="wishlist-items">
                  {wishlist.map(b => (
                    <div key={b._id} className="wishlist-item">
                      <img src={imgSrc(b)} alt={b.name} className="wishlist-item-image" />
                      <div className="wishlist-item-info">
                        <Link to={`/proizvodi/${b._id}`} className="wishlist-item-name" onClick={() => setOpen(false)}>
                          {b.name}
                        </Link>
                        <div className="wishlist-item-meta">
                          {b.manufacturer?.name} {b.abv ? `• ${b.abv}%` : ''} {b.type ? `• ${b.type}` : ''}
                        </div>
                      </div>
                      <button className="wishlist-remove" onClick={() => removeFromWishlist(b._id)}>🗑️</button>
                    </div>
                  ))}
                </div>
                <div className="wishlist-footer">
                  <button className="wishlist-clear" onClick={clearWishlist}>Očisti</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}