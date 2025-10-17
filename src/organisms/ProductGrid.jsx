import React from 'react';
import ProductCard from '../molecules/ProductCard.jsx';
export default function ProductGrid({ products, onAddToCart, onProductClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onClick={() => onProductClick(product)}
        />
      ))}
    </div>
  );
}