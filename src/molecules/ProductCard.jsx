// src/molecules/ProductCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Badge from '../atoms/Badge';

export default function ProductCard({ product, onAddToCart, onClick }) {
  return (
    <Card className="product-card h-100" onClick={onClick}>
      <div className="product-image-box">
        {/* Cambiar emoji por imagen */}
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
          style={{ 
            width: '100%', 
            height: '200px', 
            objectFit: 'cover' 
          }}
        />
        {product.sustainable && (
          <div className="position-absolute top-0 end-0 m-2">
            <Badge variant="organic">Orgánico</Badge>
          </div>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{product.name}</Card.Title>
        <Card.Text className="text-muted small flex-grow-1">
          {product.description.substring(0, 100)}...
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="product-price">${product.price.toLocaleString()} CLP</span>
          <span className="product-stock">{product.stock} {product.unit}</span>
        </div>
        <Button 
          className="btn-verde w-100"
          onClick={(e) => { 
            e.stopPropagation(); 
            onAddToCart(product); 
          }}
        >
          Agregar al Carrito
        </Button>
      </Card.Body>
    </Card>
  );
}