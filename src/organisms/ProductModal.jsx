import React from 'react';
import Button from '../atoms/Button';

export default function ProductModal({ product, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !product) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-8">
          <button onClick={onClose} className="float-right text-3xl hover:text-gray-600">×</button>
          <div className="flex gap-8 mb-6">
            <div className="w-64 h-64 bg-gradient-to-br from-green-600 to-green-400 rounded-xl flex items-center justify-center text-8xl">
              {product.emoji}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h2>
              <p className="text-3xl font-bold text-green-600 mb-4">
                ${product.price.toLocaleString()} CLP
              </p>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="space-y-2 mb-6">
                <p><strong>Origen:</strong> {product.origin}</p>
                <p><strong>Stock:</strong> {product.stock} {product.unit}s</p>
                {product.sustainable && <p className="text-green-600 font-semibold">✓ Producto orgánico</p>}
              </div>
              <Button onClick={() => { onAddToCart(product); onClose(); }}>
                Agregar al Carrito
              </Button>
            </div>
          </div>
          
          {product.reviews.length > 0 && (
            <div className="border-t pt-6">
              <h3 className="text-xl font-bold mb-4">Reseñas ({product.reviews.length})</h3>
              {product.reviews.map((review, idx) => (
                <div key={idx} className="mb-4 pb-4 border-b last:border-0">
                  <div className="flex justify-between mb-2">
                    <strong>{review.user}</strong>
                    <span className="text-yellow-400">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}