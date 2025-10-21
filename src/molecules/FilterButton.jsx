// src/molecules/FilterButton.jsx
import React from 'react';
import { Button } from 'react-bootstrap';

export default function FilterButton({ active, onClick, children }) {
  return (
    <Button
      onClick={onClick}
      className={`filter-btn ${active ? 'active' : ''}`}
    >
      {children}
    </Button>
  );
}