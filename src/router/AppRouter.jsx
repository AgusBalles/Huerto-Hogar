import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import About from '../pages/About';
import Contact from '../pages/Contact';
import OrderHistory from '../pages/OrderHistory';
import { productsData } from '../data/products';

const AppRouter = () => {
  const [cart, setCart] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // Funciones del carrito
  const addToCart = (productId, quantity = 1) => {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
          : item
      ));
    } else {
      setCart([...cart, {
        id: productId,
        name: product.name,
        price: product.price,
        quantity: quantity,
        unit: product.unit,
        image: product.image
      }]);
    }

    showNotification(`${product.name} agregado al carrito`, 'success');
    setLoyaltyPoints(prev => prev + Math.floor(product.price * quantity / 100));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    showNotification('Producto eliminado del carrito', 'info');
  };

  const updateQuantity = (productId, newQuantity) => {
    const product = productsData.find(p => p.id === productId);
    
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else if (newQuantity <= product.stock) {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    } else {
      showNotification('Stock insuficiente', 'warning');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const showNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Props compartidos
  const sharedProps = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    currentUser,
    setCurrentUser,
    loyaltyPoints,
    setLoyaltyPoints,
    totalItems,
    products: productsData,
    showNotification
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home {...sharedProps} />} />
        <Route path="/products" element={<Products {...sharedProps} />} />
        <Route path="/cart" element={<Cart {...sharedProps} />} />
        <Route path="/checkout" element={<Checkout {...sharedProps} />} />
        <Route path="/login" element={<Login {...sharedProps} />} />
        <Route path="/register" element={<Register {...sharedProps} />} />
        <Route path="/about" element={<About {...sharedProps} />} />
        <Route path="/contact" element={<Contact {...sharedProps} />} />
        <Route path="/order-history" element={<OrderHistory {...sharedProps} />} />
      </Routes>

      {/* Notificaciones globales */}
      {notifications.map(notif => (
        <div key={notif.id} className={`notification ${notif.type}`}
          style={{
            position: 'fixed',
            top: '100px',
            right: '20px',
            zIndex: 3000,
            animation: 'slideIn 0.3s ease'
          }}>
          <div className="notification-content">
            <span>{notif.message}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default AppRouter;