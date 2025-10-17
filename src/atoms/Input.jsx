import React from 'react';

export default function Input({ type = 'text', placeholder, value, onChange, className = '' }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-green-600 focus:outline-none ${className}`}
    />
  );
}