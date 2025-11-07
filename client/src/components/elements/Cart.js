import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../static/styles/cart.css';
import { useCart } from '../../context/CartContext';

function Cart({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, loadingCart, totalItems, totalPrice, updateQuantity, removeItem, clearCart, purchaseCart } = useCart();
  const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
  if (!user) return null;

  const getImgSrc = (beer) => {
    const filename = beer?.imageUrl ? beer.imageUrl.split("/").pop() : "1.jpg";
    return `${API_BASE}/static/images/beers/${filename}`;
  };

  return (
    <div className="cart-widget">
      <button className="cart-toggle" onClick={() => setIsOpen(!isOpen)}>🛒 ({totalItems})</button>
      {isOpen && (
        <div className="cart-dropdown">
          <div className="cart-header">
            <h3>Košarica</h3>
            <button className="cart-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="cart-content">
            {loadingCart ? (
              <div className="cart-loading">Učitavanje...</div>
            ) : cart.length === 0 ? (
              <div className="cart-empty">Košarica je prazna</div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.beer._id} className="cart-item">
                      <img src={getImgSrc(item.beer)} alt={item.beer.name} className="cart-item-image" />
                      <div className="cart-item-info">
                        <Link to={`/proizvodi/${item.beer._id}`} className="cart-item-name" onClick={() => setIsOpen(false)}>
                          {item.beer.name}
                        </Link>
                        <div className="cart-item-price">{item.beer.priceEur}€ x {item.quantity}</div>
                        <div className="cart-item-controls">
                          <button onClick={() => updateQuantity(item.beer._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.beer._id, item.quantity + 1)}>+</button>
                          <button className="cart-item-remove" onClick={() => removeItem(item.beer._id)}>🗑️</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <div className="cart-total">Ukupno: {totalPrice.toFixed(2)}€</div>
                  <div className="cart-actions">
                    <button className="cart-clear" onClick={clearCart}>Očisti</button>
                    <button className="cart-checkout" onClick={() => { purchaseCart(); setIsOpen(false); }}>Naruči</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Cart;