// src/organisms/ProductGrid.jsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../molecules/ProductCard';

export default function ProductGrid({ products, onAddToCart, onProductClick }) {
  return (
    <Row className="g-4">
      {products.map(product => (
        <Col key={product.id} xs={12} sm={6} lg={4}>
          <ProductCard
            product={product}
            onAddToCart={onAddToCart}
            onClick={() => onProductClick(product)}
          />
        </Col>
      ))}
    </Row>
  );
}