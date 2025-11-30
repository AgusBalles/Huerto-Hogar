// src/organisms/Footer.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="footer-custom">
      <Container className="text-center">
        <h3 className="mb-3">🌱 HuertoHogar</h3>
        <p className="mb-3 text-white">Del campo directo a tu mesa</p>
        <p className="small text-white">
          © 2025 HuertoHogar. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}