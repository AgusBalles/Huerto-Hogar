// src/organisms/Navbar.jsx
import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

export default function NavbarComponent({ cartCount, onToggleCart, onToggleLogin }) {
  return (
    <Navbar className="navbar-custom" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand href="#home">🌱 HuertoHogar</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link onClick={onToggleCart} className="position-relative me-3">
              <span style={{ fontSize: '1.5rem' }}>🛒</span>
              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount}
                </span>
              )}
            </Nav.Link>
            <Nav.Link onClick={onToggleLogin}>
              <span style={{ fontSize: '1.5rem' }}>👤</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}