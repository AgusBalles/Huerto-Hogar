import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavbarComponent from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import CartSidebar from '../organisms/CartSidebar';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // Si ya está autenticado, redirigir
  React.useEffect(() => {
    if (user) {
      console.log('✅ Usuario ya autenticado, redirigiendo...');
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/productos');
      }
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    if (showError) {
      setShowError(false);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false);
    setErrorMessage('');
    setIsLoading(true);
    
    if (validateForm()) {
      try {
        console.log('🔐 Intentando login con:', formData.email);
        
        const result = await login(formData.email, formData.password);
        console.log('📋 Resultado del login:', result);
        
        if (result.success) {
          console.log('✅ Login exitoso, redirigiendo según rol...');
          // Redirigir directamente según el rol devuelto por la función login
          if (result.user && result.user.role === 'admin') {
            // marcar que venimos del login para que el botón "Volver" no regrese al login (evita bucle)
            try { sessionStorage.setItem('afterLogin', 'admin'); } catch(e) {}
            navigate('/admin');
          } else {
            navigate('/productos');
          }
        } else {
          if (result.error === "USER_NOT_FOUND") {
            setErrorMessage('❌ No te encuentras registrado en nuestro sistema. Por favor regístrate primero.');
          } else if (result.error === "INVALID_PASSWORD") {
            setErrorMessage('❌ Contraseña incorrecta. Intenta nuevamente.');
          } else {
            setErrorMessage('❌ Error en el login. Intenta nuevamente.');
          }
          setShowError(true);
          
          console.error('🚨 ERROR DE LOGIN:', {
            email: formData.email,
            error: result.error
          });
        }
      } catch (error) {
        console.error('💥 Error en el proceso de login:', error);
        setErrorMessage('❌ Error del sistema. Intenta más tarde.');
        setShowError(true);
      }
    }
    setIsLoading(false);
  };

  return (
    <>
      <NavbarComponent />
      <CartSidebar />
      
      <Container className="py-5" style={{ marginTop: '100px', minHeight: '70vh' }}>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Iniciar Sesión</h2>
                  <p className="text-muted">Bienvenido de vuelta a HuertoHogar</p>
                </div>

                {showError && (
                  <Alert 
                    variant="danger" 
                    onClose={() => setShowError(false)} 
                    dismissible
                    className="border-0 shadow-sm"
                    style={{
                      backgroundColor: '#fee2e2',
                      borderLeft: '4px solid #dc2626',
                      color: '#7f1d1d'
                    }}
                  >
                    <div className="d-flex align-items-start">
                      <span className="fw-bold me-2" style={{ fontSize: '1.2em' }}>⚠️</span>
                      <div>
                        <span className="fw-bold">{errorMessage}</span>
                        {errorMessage.includes('registrado') && (
                          <div className="mt-2">
                            <small className="d-block mb-1">¿Eres nuevo en HuertoHogar?</small>
                            <Link to="/registro" className="btn btn-sm btn-outline-danger">
                              Crear Cuenta Gratis
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                      disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Button 
                    type="submit" 
                    className="btn-verde w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Iniciando sesión...
                      </>
                    ) : (
                      'Iniciar Sesión'
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="mb-0">
                      ¿No tienes cuenta? <Link to="/registro" className="fw-bold text-success">Regístrate aquí</Link>
                    </p>
                    <small className="text-muted mt-2 d-block">
                      Usuario demo: demo@test.com / 123456
                    </small>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}