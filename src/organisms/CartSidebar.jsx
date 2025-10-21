import React from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Button from '../atoms/Button';

const CartSidebar = ({ 
  isOpen, 
  onClose, 
  items = [], 
  onUpdateQuantity, 
  onRemove, 
  onCheckout,
  currentUser 
}) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`cart-overlay ${isOpen ? 'show' : ''}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'show' : ''}`}>
        {/* Header */}
        <div className="cart-header bg-success text-white">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <ShoppingCart size={24} />
              <h3 className="mb-0 h5">Mi Carrito</h3>
            </div>
            <button 
              onClick={onClose} 
              className="btn btn-link text-white p-0"
              aria-label="Cerrar carrito"
              style={{ textDecoration: 'none' }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Items Count */}
        {items.length > 0 && (
          <div className="px-3 py-2 bg-light border-bottom">
            <small className="text-success fw-semibold">
              {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu carrito
            </small>
          </div>
        )}

        {/* Cart Items */}
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center px-3">
              <div style={{ fontSize: '4rem', opacity: 0.5 }}>🛒</div>
              <p className="text-muted h5 mb-2">Tu carrito está vacío</p>
              <p className="text-muted small mb-4">Agrega productos para comenzar tu compra</p>
              <button onClick={onClose} className="btn btn-outline-verde">
                Explorar Productos
              </button>
            </div>
          ) : (
            <div>
              {items.map(item => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemove}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-footer bg-light">
            {/* Subtotal */}
            <div className="mb-3">
              <div className="d-flex justify-content-between text-muted mb-2">
                <span>Subtotal:</span>
                <span className="fw-semibold">${total.toLocaleString()} CLP</span>
              </div>
              <div className="d-flex justify-content-between text-muted mb-2">
                <span>Envío:</span>
                <span className="fw-semibold text-success">Gratis</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between h5 mb-0">
                <span>Total:</span>
                <span className="text-success fw-bold">${total.toLocaleString()} CLP</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-grid gap-2">
              <button 
                onClick={onCheckout} 
                className="btn btn-amarillo btn-lg d-flex align-items-center justify-content-center gap-2"
              >
                <ShoppingCart size={20} />
                Finalizar Compra
              </button>
              <button 
                onClick={onClose} 
                className="btn btn-outline-verde"
              >
                Seguir Comprando
              </button>
            </div>

            {/* User Status */}
            {!currentUser && (
              <div className="mt-3 p-2 bg-warning bg-opacity-10 border border-warning rounded">
                <small className="text-warning d-block text-center">
                  💡 Inicia sesión para guardar tu carrito
                </small>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

// Componente individual de item del carrito
const CartItemCard = ({ item, onUpdateQuantity, onRemove }) => {
  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      {/* Product Emoji */}
      <div className="cart-item-emoji flex-shrink-0">
        {item.emoji}
      </div>

      {/* Product Info */}
      <div className="flex-grow-1">
        <h6 className="mb-1 fw-semibold text-truncate">{item.name}</h6>
        <small className="text-muted d-block mb-2">
          ${item.price.toLocaleString()} / {item.unit}
        </small>

        {/* Quantity Controls */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="cart-controls">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="btn btn-verde btn-sm"
              aria-label="Disminuir cantidad"
            >
              <Minus size={14} />
            </button>
            <span className="fw-semibold px-2">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="btn btn-verde btn-sm"
              aria-label="Aumentar cantidad"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Item Total */}
          <div className="text-end">
            <small className="fw-bold text-success d-block">
              ${itemTotal.toLocaleString()}
            </small>
          </div>
        </div>

        {/* Stock Warning */}
        {item.quantity >= item.stock && (
          <div className="mt-2">
            <small className="text-warning">
              ⚠️ Stock máximo alcanzado
            </small>
          </div>
        )}
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(item.id)}
        className="btn btn-link text-danger p-0 ms-2"
        aria-label="Eliminar producto"
        style={{ textDecoration: 'none' }}
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default CartSidebar;