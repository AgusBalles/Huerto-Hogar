import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Button from '../atoms/Button';

const ProductCard = ({ product, onAddToCart, onClick }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div
        onClick={() => onClick?.()}
        className="card-img-top d-flex align-items-center justify-content-center p-3 border-bottom" 
        style={{ height: 160, cursor: 'pointer', backgroundColor: '#f8f9fa' }}
      >
        <img
          src={product.image}
          alt={product.name}
          className="img-fluid"
          style={{ maxHeight: 130, objectFit: 'contain', width: 'auto' }}
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h5
          onClick={() => onClick?.()}
          className="card-title mb-2"
          style={{ cursor: 'pointer' }}
        >
          {product.name}
        </h5>

        <p className="card-text text-muted mb-3 flex-grow-1" style={{ fontSize: 14 }}>
          {product.description}
        </p>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <strong className="text-success">${product.price.toLocaleString()}</strong>
          <div className="text-muted small">
            {product.sustainable && (
              <span className="badge bg-success text-white me-2">Orgánico</span>
            )}
            <span>Stock: {product.stock}</span>
          </div>
        </div>

        <Button
          onClick={() => onAddToCart(product)}
          className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <ShoppingCart size={16} />
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;