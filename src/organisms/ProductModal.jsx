// src/organisms/ProductModal.jsx
import React from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  if (!product) return null;
  
  return (
    <Modal 
      show={isOpen} 
      onHide={onClose} 
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={5}>
            <div className="modal-product-image">
              {product.emoji}
            </div>
          </Col>
          <Col md={7}>
            <h2 className="product-price mb-3">
              ${product.price.toLocaleString()} CLP
            </h2>
            <p className="text-muted mb-4">{product.description}</p>
            <div className="mb-4">
              <p><strong>Origen:</strong> {product.origin}</p>
              <p><strong>Stock:</strong> {product.stock} {product.unit}s</p>
              {product.sustainable && (
                <p className="text-success fw-bold">✓ Producto orgánico</p>
              )}
            </div>
            <Button 
              className="btn-verde w-100"
              onClick={() => { 
                onAddToCart(product); 
                onClose(); 
              }}
            >
              Agregar al Carrito
            </Button>
          </Col>
        </Row>
        
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-4 pt-4 border-top">
            <h5 className="mb-3">Reseñas ({product.reviews.length})</h5>
            {product.reviews.map((review, idx) => (
              <div key={idx} className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between mb-2">
                  <strong>{review.user}</strong>
                  <span className="review-stars">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}
                  </span>
                </div>
                <p className="text-muted mb-0">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>s
    </Modal>
  );
}