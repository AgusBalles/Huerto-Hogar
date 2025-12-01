// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import AdminDashboard from './pages/AdminDashboard';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/products" element={<Products />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/historial" element={<OrderHistory />} />
            {/* Admin */}
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}