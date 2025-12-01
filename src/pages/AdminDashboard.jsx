import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { getTotalOrders, getTotalRevenue, getAverageOrderValue, salesData } from '../data/sales';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Box, Users } from 'lucide-react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const totalOrders = getTotalOrders(salesData);
  const totalRevenue = getTotalRevenue(salesData);
  const avgOrder = getAverageOrderValue(salesData);

  return (
    <Container className="py-5 admin-dashboard" style={{ marginTop: '90px' }}>
      <div className="d-flex align-items-start justify-content-between mb-4">
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-outline-verde me-2" onClick={() => navigate(-1)} aria-label="Volver">
            ← Volver
          </button>
          <div>
            <h2 className="mb-0">Panel de Administración</h2>
            <div className="small text-muted">Resumen de actividades diarias</div>
          </div>
        </div>
      </div>

      <Row className="g-3">
        <Col md={4}>
          <Card className="shadow-sm stat-card bg-success text-white">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="stat-icon bg-white bg-opacity-15 p-3 rounded-circle">
                <ShoppingCart size={28} />
              </div>
              <div>
                <Card.Title className="mb-1 text-white small">Compras</Card.Title>
                <div className="stat-value h3 mb-0">{totalOrders.toLocaleString()}</div>
                <small className="d-block text-white-50">Probabilidad de aumento: 20%</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm stat-card bg-success-2 text-white">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="stat-icon bg-white bg-opacity-15 p-3 rounded-circle">
                <Box size={28} />
              </div>
              <div>
                <Card.Title className="mb-1 text-white small">Productos</Card.Title>
                <div className="stat-value h3 mb-0">400</div>
                <small className="d-block text-white-50">Inventario actual</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm stat-card bg-warning text-dark">
            <Card.Body className="d-flex align-items-center gap-3">
              <div className="stat-icon bg-white bg-opacity-15 p-3 rounded-circle">
                <Users size={28} />
              </div>
              <div>
                <Card.Title className="mb-1 small">Usuarios</Card.Title>
                <div className="stat-value h3 mb-0">890</div>
                <small className="d-block text-dark-50">Nuevos este mes: 120</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Ventas recientes</Card.Title>
              <div className="table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Fecha</th>
                      <th>Items</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.map(s => (
                      <tr key={s.id}>
                        <td>{s.id}</td>
                        <td>{s.date}</td>
                        <td>{s.items}</td>
                        <td>${s.total.toLocaleString()} CLP</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
