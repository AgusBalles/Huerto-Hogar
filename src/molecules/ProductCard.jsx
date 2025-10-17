import React from 'react';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';

export default function ProductCard({ product, onAddToCart, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
    >
      <div className="h-48 bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-6xl relative">
        {product.emoji}
        {product.sustainable && (
          <div className="absolute top-3 right-3">
            <Badge variant="organic">Orgánico</Badge>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-green-600">${product.price.toLocaleString()}</span>
          <span className="text-sm text-gray-500">{product.stock} {product.unit}s</span>
        </div>
        <Button 
          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
          variant="primary"
          className="w-full"
        >
          Agregar al Carrito
        </Button>
      </div>
    </div>
  );
}