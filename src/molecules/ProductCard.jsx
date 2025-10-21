import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Button from '../atoms/Button';

const ProductCard = ({ product, onAddToCart, onClick }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full">
      {/* Imagen clickeable para detalles */}
      <div 
        onClick={() => onClick?.()}
        className="h-40 bg-gray-50 flex items-center justify-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="object-contain"
          style={{ maxWidth: '120px', maxHeight: '120px' }}
        />
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        {/* Título clickeable para detalles */}
        <h3 
          onClick={() => onClick?.()}
          className="font-semibold text-gray-800 mb-2 text-base line-clamp-1 cursor-pointer hover:text-green-600"
        >
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-green-600">
            ${product.price.toLocaleString()}
          </span>
          <div className="flex items-center gap-2">
            {product.sustainable && (
              <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                Orgánico
              </span>
            )}
            <span className="text-xs text-gray-500">
              Stock: {product.stock}
            </span>
          </div>
        </div>
        
        {/* Botón SOLO para agregar al carrito */}
        <Button 
          onClick={() => {
            
            onAddToCart(product);
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded flex items-center justify-center gap-2"
        >
          <ShoppingCart size={16} />
          Agregar al carrito
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;