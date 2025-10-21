// src/organisms/Footer.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="footer-custom">
      <Container className="text-center">
        <h3 className="mb-3">🌱 HuertoHogar</h3>
        <p className="text-muted mb-3">Del campo directo a tu mesa</p>
        <p className="small text-muted">
          © 2024 HuertoHogar. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}