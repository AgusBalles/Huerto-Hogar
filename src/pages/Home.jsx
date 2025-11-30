// src/pages/Home.jsx
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../organisms/Navbar';
import Hero from '../organisms/Hero';
import ProductGrid from '../organisms/ProductGrid';
import CartSidebar from '../organisms/CartSidebar';
import ProductModal from '../organisms/ProductModal';
import Footer from '../organisms/Footer';
import FilterButton from '../molecules/FilterButton';
import { productsData } from '../molecules/data/products';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const filters = [
    { id: 'all', label: 'Todos', icon: '' },
    { id: 'frutas', label: 'Frutas Frescas', icon: '🍎' },
    { id: 'verduras', label: 'Verduras Orgánicas', icon: '🥬' },
    { id: 'organicos', label: 'Productos Orgánicos', icon: '🌾' },
    { id: 'lacteos', label: 'Productos Lácteos', icon: '🥛' }
  ];
  
  const filteredProducts = currentFilter === 'all' 
    ? productsData 
    : productsData.filter(p => p.category === currentFilter);
  
  const handleCheckout = () => {
    if (!cart || cart.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    alert('¡Pedido realizado con éxito!');
    clearCart && clearCart();
    setCartOpen(false);
  };
  
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };
  
  const cartCount = (cart || []).reduce((sum, item) => sum + (item.quantity || 0), 0);
  
  return (
    <div>
      <Navbar 
        cartCount={cartCount}
        onToggleCart={() => setCartOpen(!cartOpen)}
        onToggleLogin={() => alert('Login modal')}
      />
      
      <Hero />
      
      <section className="py-5">
        <Container>
          <h2 className="text-center fw-bold mb-5" style={{ fontSize: '2.5rem' }}>
            Nuestros Productos
          </h2>
          
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {filters.map(filter => (
              <FilterButton
                key={filter.id}
                active={currentFilter === filter.id}
                onClick={() => setCurrentFilter(filter.id)}
              >
                {filter.icon} {filter.label}
              </FilterButton>
            ))}
          </div>
          
          <ProductGrid
            products={filteredProducts}
            onAddToCart={addToCart}
            onProductClick={openProductModal}
          />
        </Container>
      </section>
      
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
      
      <ProductModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={addToCart}
      />
      
      <Footer />
    </div>
  );
}