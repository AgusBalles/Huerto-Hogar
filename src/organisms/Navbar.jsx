// src/organisms/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartSidebar from './CartSidebar';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, updateQuantity, removeFromCart, getCartCount } = useCart();
  const { currentUser } = useAuth();

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  const handleCheckout = () => {
    closeCart();
    window.location.href = '/checkout';
  };

  const cartCount = getCartCount();

  return (
    <>
      <nav className="navbar navbar-custom navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            🌱 HuertoHogar
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/productos">Productos</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/nosotros">Nosotros</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contacto">Contacto</Link>
              </li>
            </ul>

            <div className="d-flex gap-3 align-items-center">
              <button className="btn btn-link text-dark p-2" aria-label="Buscar">
                <Search size={20} />
              </button>

              <button 
                className="btn btn-link text-dark p-2 position-relative" 
                onClick={toggleCart}
                aria-label="Carrito de compras"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="cart-badge">
                    {cartCount}
                  </span>
                )}
              </button>

              <Link 
                to={currentUser ? "/perfil" : "/login"} 
                className="btn btn-link text-dark p-2"
                aria-label={currentUser ? "Perfil" : "Iniciar sesión"}
              >
                <User size={24} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        currentUser={currentUser}
      />
    </>
  );
};

export default Navbar;