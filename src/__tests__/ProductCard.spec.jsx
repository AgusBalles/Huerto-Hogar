// src/__tests__/ProductCard.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../molecules/ProductCard'; // ← Ruta corregida

// Mock de lucide-react y Button
jest.mock('lucide-react', () => ({
  ShoppingCart: () => <svg data-testid="shopping-cart-icon" />
}));

jest.mock('../atoms/Button', () => {
  return function MockButton({ children, onClick, className }) {
    return (
      <button 
        onClick={onClick} 
        className={className}
        data-testid="add-to-cart-button"
      >
        {children}
      </button>
    );
  };
});

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    name: 'Manzanas Fuji',
    price: 1200,
    stock: 150,
    description: 'Manzanas Fuji crujientes y dulces cultivadas en el Valle del Maule.',
    image: '/img/manzana.png',
    sustainable: true,
    unit: 'kilo'
  };

  const mockOnAddToCart = jest.fn();
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza la información del producto correctamente', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText('Manzanas Fuji')).toBeInTheDocument();
    expect(screen.getByText('$1.200')).toBeInTheDocument();
    expect(screen.getByText('Stock: 150')).toBeInTheDocument();
    expect(screen.getByText('Orgánico')).toBeInTheDocument();
  });

  test('muestra el badge orgánico solo cuando el producto es sustainable', () => {
    const productNoOrganic = { ...mockProduct, sustainable: false };
    
    const { rerender } = render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        onClick={mockOnClick}
      />
    );
    
    expect(screen.getByText('Orgánico')).toBeInTheDocument();

    rerender(
      <ProductCard 
        product={productNoOrganic} 
        onAddToCart={mockOnAddToCart}
        onClick={mockOnClick}
      />
    );

    expect(screen.queryByText('Orgánico')).not.toBeInTheDocument();
  });

  test('renderiza la imagen con los atributos correctos', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        onClick={mockOnClick}
      />
    );

    const image = screen.getByAltText('Manzanas Fuji');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/img/manzana.png');
  });

  test('llama a onClick cuando se hace clic en la tarjeta', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        onClick={mockOnClick}
      />
    );

    const card = screen.getByText('Manzanas Fuji').closest('div[class*="bg-white"]');
    fireEvent.click(card);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('llama a onAddToCart cuando se hace clic en el botón', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        onClick={mockOnClick}
      />
    );

    const button = screen.getByTestId('add-to-cart-button');
    fireEvent.click(button);

    expect(mockOnAddToCart).toHaveBeenCalledWith(mockProduct);
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});