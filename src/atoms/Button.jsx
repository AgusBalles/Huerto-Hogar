import React from 'react';

export default function Button({ children, onClick, variant = 'primary', className = '' }) {
  const baseStyle = 'px-6 py-3 rounded-full font-semibold transition-all duration-300';
  const variants = {
    primary: 'bg-green-600 hover:bg-green-700 text-white',
    secondary: 'bg-yellow-400 hover:bg-yellow-500 text-gray-800',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
  };
  
  return (
    <button 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}