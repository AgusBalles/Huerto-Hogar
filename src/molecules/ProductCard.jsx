import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Button from '../atoms/Button';

const ProductCard = ({ product, onAddToCart, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className="h-48 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-6xl relative">
        {product.emoji}
        {product.sustainable && (
          <div className="absolute top-2 right-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-600 text-white">
              Orgánico
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-2xl font-bold text-green-600">
            ${product.price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-500">
            {product.stock} {product.unit}s
          </span>
        </div>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="w-full"
        >
          <ShoppingCart size={18} /> Agregar
        </Button>
      </div>
      
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;