// src/pages/Products.jsx
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import NavbarComponent from '../organisms/Navbar';
import ProductGrid from '../organisms/ProductGrid';
import CartSidebar from '../organisms/CartSidebar';
import ProductModal from '../organisms/ProductModal';
import Footer from '../organisms/Footer';
import FilterButton from '../molecules/FilterButton';
import { productsData } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Products() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToCart } = useCart();
  
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
  
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };
  
  return (
    <>
      <NavbarComponent />
      <CartSidebar />
      
      <section className="py-5" style={{ marginTop: '100px' }}>
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
      
      <ProductModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddToCart={addToCart}
      />
      
      <Footer />
    </>
  );
}