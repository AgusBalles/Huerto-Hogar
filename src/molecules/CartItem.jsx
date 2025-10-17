import React from 'react';

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-200">
      <div className="text-4xl">{item.emoji}</div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{item.name}</h4>
        <p className="text-sm text-gray-600">${item.price.toLocaleString()} CLP</p>
      </div>
      <div className="flex items-center gap-2">
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 bg-green-600 text-white rounded-full hover:bg-green-700"
        >
          -
        </button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 bg-green-600 text-white rounded-full hover:bg-green-700"
        >
          +
        </button>
        <button 
          onClick={() => onRemove(item.id)}
          className="ml-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600"
        >
          ×
        </button>
      </div>
    </div>
  );
}
