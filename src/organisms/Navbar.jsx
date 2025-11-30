// src/organisms/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, User as UserIcon, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartSidebar from './CartSidebar';

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, updateQuantity, removeFromCart, getCartCount } = useCart();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();



  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const closeCart = () => setIsCartOpen(false);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleLogout = () => {
    (async () => {
      try {
        console.log('🚪 [Navbar] Intentando cerrar sesión...');
        await logout();

        // Seguridad extra: eliminar cualquier key relacionada si queda alguna
        try {
          const toRemove = [];
          for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (!k) continue;
            const lk = k.trim().toLowerCase();
            if (lk.includes('huerto') || lk.includes('session')) toRemove.push(k);
          }
          toRemove.forEach(k => localStorage.removeItem(k));
        } catch (e) {
          console.warn('No se pudieron limpiar keys adicionales en Navbar', e);
        }

        // Navegar y recargar para forzar estado limpio
        navigate('/');
        setTimeout(() => window.location.reload(), 80);
      } catch (e) {
        console.error('Error durante logout desde Navbar', e);
      }
    })();
  };

  const cartCount = getCartCount();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            🌱 HuertoHogar
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
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
              <button 
                className="btn btn-link text-dark p-2 position-relative" 
                onClick={toggleCart}
                aria-label="Carrito de compras"
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* ✅ DROPDOWN CON BOOTSTRAP NATIVO */}
              {currentUser ? (
                <div className="dropdown">
                  <button 
                    className="btn btn-link text-dark p-2 dropdown-toggle d-flex align-items-center" 
                    type="button" 
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    aria-label="Menú de usuario"
                    style={{ textDecoration: 'none', border: 'none' }}
                  >
                    <UserIcon size={24} />
                    <span className="ms-1 d-none d-sm-inline" style={{ fontSize: '0.9rem' }}>
                      {currentUser.name}
                    </span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li>
                      <span className="dropdown-item-text small text-muted">
                        👋 Hola, <strong>{currentUser.name}</strong>
                      </span>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center" to="/perfil">
                        <UserIcon size={16} className="me-2" />
                        Mi Perfil
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item d-flex align-items-center" to="/historial">
                        <Package size={16} className="me-2" />
                        Mis Pedidos
                      </Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button 
                        className="dropdown-item d-flex align-items-center text-danger" 
                        onClick={handleLogout}
                      >
                        <LogOut size={16} className="me-2" />
                        Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="btn btn-link text-dark p-2 d-flex align-items-center"
                  aria-label="Iniciar sesión"
                  style={{ textDecoration: 'none' }}
                >
                  <User size={24} />
                  <span className="ms-1 d-none d-sm-inline">Login</span>
                </Link>
              )}
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