import React, { useState } from 'react';
import Navbar from '../organisms/Navbar';
import Hero from '../organisms/Hero';
import ProductGrid from '../organisms/ProductGrid';
import CartSidebar from '../organisms/CartSidebar';
import ProductModal from '../organisms/ProductModal';
import Footer from '../organisms/Footer';
import FilterButton from '../molecules/FilterButton';
import { productsData } from '../data/products';

export default function Home() {
  const [cart, setCart] = useState([]);
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
  
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prev => prev.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };
  
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };
  
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    alert('¡Pedido realizado con éxito!');
    setCart([]);
    setCartOpen(false);
  };
  
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        cartCount={cartCount}
        onToggleCart={() => setCartOpen(!cartOpen)}
        onToggleLogin={() => alert('Login modal')}
      />
      
      <Hero />
      
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Nuestros Productos
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
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
        </div>
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