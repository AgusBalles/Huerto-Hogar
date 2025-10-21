import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../atoms/Button';

describe('Button', () => {
  test('renders button with correct text', () => {
    const { getByText } = render(<Button>Test Button</Button>);
    expect(getByText('Test Button')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>
    );
    
    fireEvent.click(getByText('Click Me'));
    expect(handleClick).toHaveBeenCalled();
  });

  test('applies correct variant class', () => {
    const { container } = render(
      <Button variant="primary">Primary Button</Button>
    );
    expect(container.firstChild).toHaveClass('btn-verde');
  });
});