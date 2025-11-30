// src/pages/Products.jsx
import React, { useState } from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import ProductCard from '../molecules/ProductCard';
import { useCart } from '../context/CartContext';
import { productsData as products } from '../molecules/data/products';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const categories = [
    { value: 'all', label: 'Todos', icon: '🌟' },
    { value: 'frutas', label: 'Frutas', icon: '🍎' },
    { value: 'verduras', label: 'Verduras', icon: '🥬' },
    { value: 'organicos', label: 'Orgánicos', icon: '🌾' },
    { value: 'lacteos', label: 'Lácteos', icon: '🥛' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    // opcional: notificación o toast
  };

  const handleProductClick = (product) => setSelectedProduct(product);
  const handleCloseModal = () => setSelectedProduct(null);
  const handleAddFromModal = () => {
    if (selectedProduct) {
      addToCart(selectedProduct);
      handleCloseModal();
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '80px', minHeight: '100vh' }}>
        <div className="container py-5">
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

          {filteredProducts.length > 0 ? (
            <div className="row g-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    onClick={() => handleProductClick(product)}
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

      {selectedProduct && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }} onClick={handleCloseModal}>
          <div className="modal-dialog modal-lg modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title fw-bold">{selectedProduct.name}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal} aria-label="Cerrar"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="img-fluid rounded" style={{ maxHeight: '300px', objectFit: 'contain', width: '100%' }} />
                  </div>
                  <div className="col-md-6">
                    <h4 className="text-success fw-bold mb-3">${selectedProduct.price.toLocaleString()} CLP</h4>
                    <p className="text-muted mb-3">{selectedProduct.description}</p>
                    <div className="mb-3"><strong>Categoría:</strong>{' '}<span className="badge bg-success">{selectedProduct.category}</span></div>
                    <div className="mb-3"><strong>Origen:</strong>{' '}<span className="text-muted">{selectedProduct.origin}</span></div>
                    <div className="mb-3"><strong>Stock disponible:</strong>{' '}<span className={`fw-bold ${selectedProduct.stock < 10 ? 'text-warning' : 'text-success'}`}>{selectedProduct.stock} {selectedProduct.unit}</span></div>
                    {selectedProduct.sustainable && (<div className="mb-3"><span className="badge bg-warning text-dark">🌱 Producto Orgánico</span></div>)}
                    {selectedProduct.reviews && selectedProduct.reviews.length > 0 && (
                      <div className="mb-3">
                        <strong>Reseñas:</strong>
                        <div className="mt-2">
                          {selectedProduct.reviews.slice(0, 2).map((review, index) => (
                            <div key={index} className="border-start border-3 border-success ps-2 mb-2">
                              <div className="d-flex justify-content-between"><strong>{review.user}</strong><span className="text-warning">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span></div>
                              <small className="text-muted">{review.comment}</small>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={handleCloseModal}>Cerrar</button>
                <button type="button" className="btn btn-success" onClick={handleAddFromModal}>🛒 Agregar al Carrito</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Products;
