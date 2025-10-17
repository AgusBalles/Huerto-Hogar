import React from 'react';

export default function FilterButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
        active 
          ? 'bg-green-600 text-white' 
          : 'bg-white text-green-600 border-2 border-green-600 hover:bg-green-50'
      }`}
    >
      {children}
    </button>
  );
}