import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../molecules/CartItem';

describe('CartItem', () => {
  const itemMock = {
    id: 1,
    name: 'Tomate',
    price: 2990,
    quantity: 2,
    emoji: '🍅'
  };

  const mockActualizarCantidad = jest.fn();
  const mockEliminar = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Prueba: Renderiza la información del producto correctamente
  test('renderiza la información del producto correctamente', () => {
    render(
      <CartItem 
        item={itemMock} 
        onUpdateQuantity={mockActualizarCantidad}
        onRemove={mockEliminar}
      />
    );

    expect(screen.getByText('🍅')).toBeInTheDocument();
    expect(screen.getByText('Tomate')).toBeInTheDocument();
    expect(screen.getByText('$2,990 CLP')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  // Prueba: Disminuye la cantidad cuando se hace clic en el botón "-"
  test('disminuye la cantidad cuando se hace clic en el botón menos', () => {
    render(
      <CartItem 
        item={itemMock} 
        onUpdateQuantity={mockActualizarCantidad}
        onRemove={mockEliminar}
      />
    );

    const botonMenos = screen.getByText('-');
    fireEvent.click(botonMenos);
    
    expect(mockActualizarCantidad).toHaveBeenCalledWith(1, 1);
  });

  // Prueba: Aumenta la cantidad cuando se hace clic en el botón "+"
  test('aumenta la cantidad cuando se hace clic en el botón más', () => {
    render(
      <CartItem 
        item={itemMock} 
        onUpdateQuantity={mockActualizarCantidad}
        onRemove={mockEliminar}
      />
    );

    const botonMas = screen.getByText('+');
    fireEvent.click(botonMas);
    
    expect(mockActualizarCantidad).toHaveBeenCalledWith(1, 3);
  });

  // Prueba: Elimina el producto cuando se hace clic en el botón "×"
  test('elimina el producto cuando se hace clic en el botón de eliminar', () => {
    render(
      <CartItem 
        item={itemMock} 
        onUpdateQuantity={mockActualizarCantidad}
        onRemove={mockEliminar}
      />
    );

    const botonEliminar = screen.getByText('×');
    fireEvent.click(botonEliminar);
    
    expect(mockEliminar).toHaveBeenCalledWith(1);
  });

  // Prueba: Renderiza los botones de Bootstrap correctamente
  test('renderiza los botones de Bootstrap correctamente', () => {
    render(
      <CartItem 
        item={itemMock} 
        onUpdateQuantity={mockActualizarCantidad}
        onRemove={mockEliminar}
      />
    );

    const botones = screen.getAllByRole('button');
    expect(botones).toHaveLength(4);
  });
});