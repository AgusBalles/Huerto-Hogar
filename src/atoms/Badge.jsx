import React from 'react';

export default function Badge({ children, variant = 'organic' }) {
  const variants = {
    organic: 'bg-yellow-400 text-gray-800',
    stock: 'bg-green-100 text-green-800'
  };
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${variants[variant]}`}>
      {children}
    </span>
  );
}