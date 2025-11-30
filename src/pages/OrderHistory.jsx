import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';

function OrderHistory() {
  const navigate = useNavigate();
  // Ejemplo de pedidos (en una app real vendrían de una API o contexto)
  const [orders] = useState([
    {
      id: 1,
      date: '2025-10-15',
      total: 45500,
      status: 'Entregado',
      items: [
        { name: 'Tomates orgánicos', quantity: 2, price: 1200, image: '/img/manzana.png' },
        { name: 'Lechugas frescas', quantity: 3, price: 750, image: '/img/espinaca.png' }
      ]
    },
    {
      id: 2,
      date: '2025-10-18',
      total: 68000,
      status: 'En camino',
      items: [
        { name: 'Zanahorias', quantity: 2, price: 1000, image: '/img/zanahoria.png' },
        { name: 'Espinacas', quantity: 4, price: 1200, image: '/img/espinaca.png' }
      ]
    }
  ]);

  const statusVariant = (status) => {
    switch (status) {
      case 'Entregado':
        return 'success';
      case 'En camino':
        return 'primary';
      case 'Procesando':
        return 'warning';
      case 'Cancelado':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h1 className="mb-3">Historial de Pedidos</h1>
        <p className="text-muted mb-4">Aún no has realizado ningún pedido</p>
        <Button variant="success" onClick={() => navigate('/productos')}>Ver Productos</Button>
      </Container>
    );
  }

  return (
    <Container style={{ paddingTop: 80, paddingBottom: 80 }}>
      <div className="d-flex align-items-center mb-4">
        <Button variant="outline-secondary" className="me-3" onClick={() => navigate(-1)}>&larr; Volver</Button>
        <h1 className="mb-0">Historial de Pedidos</h1>
      </div>

      <Row className="g-4">
        {orders.map((order) => (
          <Col md={12} key={order.id}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="mb-1">Pedido #{order.id}</h5>
                    <small className="text-muted">{new Date(order.date).toLocaleDateString('es-CL')}</small>
                  </div>
                  <Badge bg={statusVariant(order.status)} className="py-2 px-3">{order.status}</Badge>
                </div>

                <div className="row">
                  <div className="col-lg-8">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="d-flex align-items-center mb-3">
                        {it.image ? (
                          <img src={it.image} alt={it.name} style={{ width: 64, height: 64, objectFit: 'cover' }} className="me-3 rounded" />
                        ) : (
                          <div style={{ width: 64, height: 64 }} className="bg-light me-3 d-flex align-items-center justify-content-center rounded">🛒</div>
                        )}
                        <div>
                          <div className="fw-semibold">{it.name}</div>
                          <div className="small text-muted">Cantidad: {it.quantity} · ${ (it.price * it.quantity).toLocaleString() } CLP</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="col-lg-4">
                    <Card className="border-0 bg-light h-100">
                      <Card.Body className="d-flex flex-column justify-content-between h-100">
                        <div>
                          <div className="text-muted small">Total del pedido</div>
                          <div className="h5 text-success fw-bold">${order.total.toLocaleString()} CLP</div>
                        </div>
                        <div className="mt-3">
                          <Button variant="outline-primary" size="sm" className="me-2">Ver detalles</Button>
                          <Button variant="success" size="sm" onClick={() => navigate('/productos')}>Repetir pedido</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-4 text-center">
        <Button variant="success" onClick={() => navigate('/productos')}>Seguir Comprando</Button>
      </div>
    </Container>
  );
}

export default OrderHistory;