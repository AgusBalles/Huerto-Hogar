// src/molecules/CartItem.jsx
import React from 'react';
import { Button } from 'react-bootstrap';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="cart-item">
      <div className="cart-item-emoji">{item.emoji}</div>
      <div className="flex-grow-1">
        <h6 className="mb-1 fw-bold">{item.name}</h6>
        <p className="mb-0 small text-muted">${item.price.toLocaleString()} CLP</p>
      </div>
      <div className="cart-controls">
        <Button 
          variant="success"
          size="sm"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          -
        </Button>
        <span className="mx-2 fw-bold">{item.quantity}</span>
        <Button 
          variant="success"
          size="sm"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </Button>
        <Button 
          variant="danger"
          size="sm"
          className="ms-2"
          onClick={() => onRemove(item.id)}
        >
          ×
        </Button>
      </div>
    </div>
  );
}