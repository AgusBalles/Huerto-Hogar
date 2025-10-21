// src/organisms/Navbar.jsx
import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function NavbarComponent() {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const cartCount = getCartCount();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar className="navbar-custom" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">🌱 HuertoHogar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/cart" className="position-relative me-3">
              <span style={{ fontSize: '1.5rem' }}>🛒</span>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Nav.Link>
            
            {user ? (
              <NavDropdown 
                title={`👤 ${user.name}`} 
                id="user-dropdown"
              >
                <NavDropdown.Item as={Link} to="/order-history">
                  Historial de Pedidos
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">
                <span style={{ fontSize: '1.5rem' }}>👤</span> Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}