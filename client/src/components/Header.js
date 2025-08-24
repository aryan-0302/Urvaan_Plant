import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './Header.css'; // We will create this CSS file

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="app-header">
      <div className="container header-content">
        <Link to="/" className="header-title">
          <h1>Urvann's Plants</h1>
        </Link>
        <div className="nav-links">
          <Link to="/admin/add" className="admin-link">Admin</Link> {/* ADD THIS LINK */}
          <Link to="/cart" className="cart-icon-link">
            <div className="cart-icon">
              <span>🛒</span>
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;