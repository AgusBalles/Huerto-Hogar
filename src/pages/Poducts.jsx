// src/pages/Products.jsx
import React, { useState } from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import ProductCard from '../molecules/ProductCard';
import FilterButton from '../molecules/FilterButton';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  const categories = [
    { value: 'all', label: 'Todos', icon: '🌟' },
    { value: 'frutas', label: 'Frutas', icon: '🍎' },
    { value: 'verduras', label: 'Verduras', icon: '🥬' },
    { value: 'organicos', label: 'Orgánicos', icon: '🌾' },
    { value: 'lacteos', label: 'Lácteos', icon: '🥛' }
  ];

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Manejar agregar al carrito
  const handleAddToCart = (product) => {
    addToCart(product);
    
    // Mostrar notificación (opcional)
    alert(`${product.name} agregado al carrito! 🛒`);
  };

  return (
    <>
      <Navbar />
      
      <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <div className="container py-5">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-success mb-3">
              Nuestros Productos
            </h1>
            <p className="lead text-muted">
              Productos frescos y orgánicos directo del campo a tu mesa
            </p>
          </div>

          {/* Barra de búsqueda */}
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

          {/* Filtros de categoría */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`filter-btn ${activeCategory === cat.value ? 'active' : ''}`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* Grid de productos */}
          {filteredProducts.length > 0 ? (
            <div className="row g-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <div style={{ fontSize: '5rem' }}>😔</div>
              <h3 className="text-muted mt-3">No se encontraron productos</h3>
              <p className="text-muted">Intenta con otra búsqueda o categoría</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Products;