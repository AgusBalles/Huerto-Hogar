import React from 'react';
import { render, screen } from '@testing-library/react';
import Cart from '../components/Cart';

describe('Cart', () => {
  test('renders empty cart message', () => {
    render(<Cart items={[]} />);
    expect(screen.getByText(/carrito está vacío/i)).toBeInTheDocument();
  });

  test('renders cart items when provided', () => {
    const testItems = [
      { id: 1, name: 'Tomate' },
      { id: 2, name: 'Lechuga' }
    ];
    render(<Cart items={testItems} />);
    expect(screen.getByText('Tomate')).toBeInTheDocument();
    expect(screen.getByText('Lechuga')).toBeInTheDocument();
  });
});
