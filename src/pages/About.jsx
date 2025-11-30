// src/pages/About.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import NavbarComponent from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import CartSidebar from '../organisms/CartSidebar';
import LocationsMap from '../components/LocationsMap';

export default function About() {
  return (
    <>
      <NavbarComponent />
      <CartSidebar />

      <Container className="py-5" style={{ marginTop: '100px', minHeight: '70vh' }}>
        <Row className="mb-5">
          <Col>
            <h1 className="text-center fw-bold mb-4">Sobre HuertoHogar</h1>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col md={6}>
            <h3 className="fw-bold text-success mb-3">Nuestra Misión</h3>
            <p className="lead">
              Proporcionar productos frescos y de calidad directamente desde el campo 
              hasta la puerta de nuestros clientes, garantizando la frescura y el sabor 
              en cada entrega.
            </p>
          </Col>
          <Col md={6}>
            <h3 className="fw-bold text-success mb-3">Nuestra Visión</h3>
            <p className="lead">
              Ser la tienda online líder en la distribución de productos frescos y 
              naturales en Chile, reconocida por nuestra calidad excepcional y 
              compromiso con la sostenibilidad.
            </p>
          </Col>
        </Row>

        <Row className="text-center mb-5">
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h2 className="text-success fw-bold mb-3">6+</h2>
                <p className="text-muted">Años de experiencia</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h2 className="text-success fw-bold mb-3">9+</h2>
                <p className="text-muted">Puntos de operación</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <h2 className="text-success fw-bold mb-3">100%</h2>
                <p className="text-muted">Productos frescos</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <h3 className="fw-bold text-center mb-4">Nuestras Ubicaciones</h3>
            <div className="mb-4">
              <LocationsMap />
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
              {[ 'Santiago', 'Valparaíso', 'Viña del Mar', 'Concepción', 'Puerto Montt' ].map(city => (
                <Card key={city} className="border-success location-card" style={{ width: '150px' }}>
                  <Card.Body className="location-card-body">
                    <span className="location-pin" aria-hidden>📍</span>
                    <span className="city-name">{city}</span>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}