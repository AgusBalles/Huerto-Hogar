// src/pages/Products.jsx
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Navbar from '../organisms/Navbar';
import ProductGrid from '../organisms/ProductGrid';
import CartSidebar from '../organisms/CartSidebar';
import ProductModal from '../organisms/ProductModal';
import Footer from '../organisms/Footer';
import FilterButton from '../molecules/FilterButton';
import { productsData } from '../molecules/data/products';
import { useCart } from '../context/CartContext';

export default function Products() {
  const { cart, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', label: 'Todos', icon: '' },
    { id: 'frutas', label: 'Frutas Frescas', icon: '🍎' },
    { id: 'verduras', label: 'Verduras Orgánicas', icon: '🥬' },
    { id: 'organicos', label: 'Productos Orgánicos', icon: '🌾' },
    { id: 'lacteos', label: 'Productos Lácteos', icon: '🥛' }
  ];

  const filteredProducts = productsData.filter(product => {
    const matchesCategory = currentFilter === 'all' || product.category === currentFilter;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

      <section className="py-5">
        <Container>
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-success mb-3">Nuestros Productos</h1>
            <p className="lead text-muted">Productos frescos y orgánicos directo del campo a tu mesa</p>
          </div>

          <div className="row mb-4">
            <div className="col-md-6 mx-auto">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="🔍 Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
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
