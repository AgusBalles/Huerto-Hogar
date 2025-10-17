import React from 'react';

const Button = ({ children, onClick, className = '', type = 'button', style = {} }) => {
  return (
    <button 
      type={type}
      className={className}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;