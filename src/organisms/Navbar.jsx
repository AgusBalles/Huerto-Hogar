import React from 'react';

const Navbar = ({ cartCount, onCartClick, onLoginClick, currentUser }) => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">
            <h1>🌱 HuertoHogar</h1>
          </div>
          <ul className="nav-menu">
            <li><a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}>Inicio</a></li>
            <li><a href="#productos" onClick={(e) => { e.preventDefault(); scrollToSection('productos'); }}>Productos</a></li>
            <li><a href="#nosotros" onClick={(e) => { e.preventDefault(); scrollToSection('nosotros'); }}>Nosotros</a></li>
            <li><a href="#blog" onClick={(e) => { e.preventDefault(); scrollToSection('blog'); }}>Blog</a></li>
            <li><a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToSection('contacto'); }}>Contacto</a></li>
          </ul>
          <div className="nav-actions">
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
            <button className="cart-btn" onClick={onCartClick}>
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{cartCount}</span>
            </button>
            <button className="login-btn" onClick={onLoginClick}>
              <i className={currentUser ? "fas fa-user-check" : "fas fa-user"}></i>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;