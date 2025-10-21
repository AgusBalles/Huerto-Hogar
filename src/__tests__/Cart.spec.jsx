// src/__tests__/ProductCard.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../molecules/ProductCard';

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

  test('llama a onClick cuando se hace clic en la imagen', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        onClick={mockOnClick}
      />
    );

    // Hacer clic en el contenedor de la imagen (que tiene el onClick)
    const imageContainer = screen.getByAltText('Manzanas Fuji').closest('div');
    fireEvent.click(imageContainer);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test('llama a onClick cuando se hace clic en el título', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        onClick={mockOnClick}
      />
    );

    const title = screen.getByText('Manzanas Fuji');
    fireEvent.click(title);

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

  test('no llama a onClick cuando se hace clic en el botón de agregar', () => {
    render(
      <ProductCard 
        product={mockProduct} 
        onAddToCart={mockOnAddToCart}
        onClick={mockOnClick}
      />
    );

    const button = screen.getByTestId('add-to-cart-button');
    fireEvent.click(button);

    // Verificar que onClick NO se llamó
    expect(mockOnClick).not.toHaveBeenCalled();
    // Pero onAddToCart SÍ se llamó
    expect(mockOnAddToCart).toHaveBeenCalledTimes(1);
  });
});