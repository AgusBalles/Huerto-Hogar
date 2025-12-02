import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { getTotalOrders, getTotalRevenue, getAverageOrderValue, salesData } from '../data/sales';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Box, Users, ClipboardList, Tag, User, BarChart2, Home } from 'lucide-react';

export default function AdminDashboard(props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleBack = () => {
    try {
      const afterLogin = sessionStorage.getItem('afterLogin');
      if (afterLogin === 'admin') {
        sessionStorage.removeItem('afterLogin');
        navigate('/productos');
        return;
      }
    } catch (e) {
    }

    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/productos');
    }
  };

  const totalOrders = getTotalOrders(salesData);
  const totalRevenue = getTotalRevenue(salesData);
  const avgOrder = getAverageOrderValue(salesData);

  const notify = (msg, type = 'info') => {
    if (props && typeof props.showNotification === 'function') return props.showNotification(msg, type);
    // fallback
    alert(msg);
  };

  return (
    <Container className="py-5 admin-dashboard" style={{ marginTop: '90px' }}>
      <div className="d-flex align-items-start justify-content-between mb-4">
          <div className="d-flex align-items-center gap-3">
          <button className="btn btn-outline-verde me-2" onClick={handleBack} aria-label="Volver">
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
              <div className="stat-icon">
                <ShoppingCart size={28} color="#0b6b2d" />
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
              <div className="stat-icon">
                <Box size={28} color="#0b6b2d" />
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
              <div className="stat-icon">
                <Users size={28} color="#9a4b03" />
              </div>
              <div>
                <Card.Title className="mb-1 small">Usuarios</Card.Title>
                <div className="stat-value h3 mb-0">40</div>
                <small className="d-block text-dark-50">Nuevos este mes: 20</small>
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

      <Row className="mt-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Accesos rápidos</Card.Title>
              <div className="d-flex flex-wrap gap-3 mt-3">
                <button className="quick-tile" onClick={() => navigate('/order-history')}>
                  <div className="tile-icon"><ClipboardList size={16} /></div>
                  <div>Órdenes</div>
                </button>

                <button className="quick-tile" onClick={() => navigate('/productos')}>
                  <div className="tile-icon"><Box size={16} /></div>
                  <div>Productos</div>
                </button>

                <button className="quick-tile" onClick={() => notify('Sección Categorías no implementada aún','info')}>
                  <div className="tile-icon"><Tag size={16} /></div>
                  <div>Categorías</div>
                </button>

                <button className="quick-tile" onClick={() => notify('Sección Usuarios no implementada aún','info')}>
                  <div className="tile-icon"><User size={16} /></div>
                  <div>Usuarios</div>
                </button>

                <button className="quick-tile" onClick={() => notify('Reportes no disponible aún','info')}>
                  <div className="tile-icon"><BarChart2 size={16} /></div>
                  <div>Reportes</div>
                </button>

                <button className="quick-tile" onClick={() => navigate('/profile') }>
                  <div className="tile-icon"><Home size={16} /></div>
                  <div>Perfil</div>
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
