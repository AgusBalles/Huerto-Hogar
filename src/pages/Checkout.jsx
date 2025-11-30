import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';

function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const total = (cart || []).reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí procesarías el pedido
    alert('Pedido realizado con éxito');
    clearCart && clearCart();
    navigate('/order-history');
  };

  if (!cart || cart.length === 0) {
    return (
      <Container style={{ paddingTop: 100, paddingBottom: 80 }} className="text-center">
        <h2 className="mb-4">Tu carrito está vacío</h2>
        <Button variant="success" onClick={() => navigate('/productos')}>Ver Productos</Button>
      </Container>
    );
  }

  return (
    <Container style={{ paddingTop: 100, paddingBottom: 80 }}>
      <div className="d-flex align-items-center mb-4">
        <Button variant="outline-secondary" className="me-3" onClick={() => navigate(-1)}>&larr; Volver</Button>
        <h1 className="mb-0">Finalizar Compra</h1>
      </div>

      <Row className="g-4">
        <Col md={7}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Información de envío</Card.Title>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input type="text" required className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Dirección</label>
                  <input type="text" required className="form-control" />
                </div>

                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input type="tel" required className="form-control" />
                </div>

                <div className="d-flex gap-2">
                  <Button type="submit" variant="success">Confirmar Pedido</Button>
                  <Button variant="outline-secondary" onClick={() => navigate('/productos')}>Seguir comprando</Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Resumen del pedido</Card.Title>
              <div className="mt-3">
                {cart.map((item) => (
                  <div key={item.id} className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} rounded style={{ width: 64, height: 64, objectFit: 'cover' }} className="me-3" />
                      ) : (
                        <div style={{ width: 64, height: 64 }} className="bg-light me-3 d-flex align-items-center justify-content-center">🛒</div>
                      )}
                      <div>
                        <div className="fw-semibold">{item.name}</div>
                        <div className="text-muted small">Cantidad: {item.quantity}</div>
                      </div>
                    </div>
                    <div className="fw-bold">${(item.price * item.quantity).toLocaleString()} CLP</div>
                  </div>
                ))}
              </div>

              <hr />

              <div className="d-flex justify-content-between align-items-center">
                <div className="fw-semibold">Total</div>
                <div className="h5 text-success fw-bold">${total.toLocaleString()} CLP</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;