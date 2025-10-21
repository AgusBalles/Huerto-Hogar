// src/atoms/Button.jsx
import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

export default function Button({ children, onClick, variant = 'primary', className = '' }) {
  const variantClass = {
    primary: 'btn-verde',
    secondary: 'btn-amarillo',
    outline: 'btn-outline-verde'
  };
  
  return (
    <BootstrapButton 
      onClick={onClick} 
      className={`${variantClass[variant]} ${className}`}
    >
      {children}
    </BootstrapButton>
  );
}