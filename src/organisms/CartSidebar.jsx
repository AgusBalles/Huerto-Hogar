// src/organisms/CartSidebar.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import CartItem from '../molecules/CartItem';

export default function CartSidebar({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return (
    <>
      <div 
        className={`cart-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
      />
      <div className={`cart-sidebar ${isOpen ? 'show' : ''}`}>
        <div className="cart-header">
          <h3 className="mb-0 fw-bold">Mi Carrito</h3>
          <button 
            onClick={onClose}
            className="btn-close position-absolute top-0 end-0 m-3"
            aria-label="Close"
          ></button>
        </div>
        
        <div className="cart-body">
          {cart.length === 0 ? (
            <p className="text-center text-muted py-5">Tu carrito está vacío</p>
          ) : (
            cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))
          )}
        </div>
        
        <div className="cart-footer">
          <div className="cart-total">
            Total: ${total.toLocaleString()} CLP
          </div>
          <Button 
            className="btn-amarillo w-100"
            onClick={onCheckout}
          >
            Finalizar Compra
          </Button>
        </div>
      </div>
    </>
  );
}