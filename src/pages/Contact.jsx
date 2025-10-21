// src/pages/Contact.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import NavbarComponent from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import CartSidebar from '../organisms/CartSidebar';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) newErrors.name = 'El nombre es requerido';
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.subject) newErrors.subject = 'El asunto es requerido';
    if (!formData.message) newErrors.message = 'El mensaje es requerido';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  return (
    <>
      <NavbarComponent />
      <CartSidebar />
      
      <Container className="py-5" style={{ marginTop: '100px', minHeight: '70vh' }}>
        <Row className="mb-4">
          <Col>
            <h1 className="text-center fw-bold">Contáctanos</h1>
            <p className="text-center text-muted">
              ¿Tienes alguna pregunta? Estamos aquí para ayudarte
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={8} className="mx-auto">
            {showSuccess && (
              <Alert variant="success" className="mb-4">
                ¡Mensaje enviado exitosamente! Te responderemos pronto.
              </Alert>
            )}

            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Nombre *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          isInvalid={!!errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          isInvalid={!!errors.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Asunto *</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      isInvalid={!!errors.subject}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.subject}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Mensaje *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      isInvalid={!!errors.message}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button type="submit" className="btn-verde w-100">
                    Enviar Mensaje
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <Row className="mt-5">
              <Col md={4} className="text-center mb-3">
                <div className="mb-2" style={{ fontSize: '2rem' }}>📞</div>
                <strong>Teléfono</strong>
                <p className="text-muted">+56 9 1234 5678</p>
              </Col>
              <Col md={4} className="text-center mb-3">
                <div className="mb-2" style={{ fontSize: '2rem' }}>✉️</div>
                <strong>Email</strong>
                <p className="text-muted">info@huertohogar.cl</p>
              </Col>
              <Col md={4} className="text-center mb-3">
                <div className="mb-2" style={{ fontSize: '2rem' }}>📍</div>
                <strong>Ubicación</strong>
                <p className="text-muted">Chile</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}