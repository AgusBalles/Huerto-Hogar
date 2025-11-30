// src/organisms/Hero.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero-section">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} className="text-center">
            <h1 className="hero-title">
              Del Campo Directo a Tu Mesa
            </h1>
            <p className="hero-text">
              Productos frescos y orgánicos con más de 6 años de experiencia llevando 
              lo mejor del campo chileno a tu hogar.
            </p>
            <Link to="/productos" className="btn btn-verde btn-lg">
              Ver Productos
            </Link>
          </Col>
        </Row>
      </Container>
    </section>
  );
}