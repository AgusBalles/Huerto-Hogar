import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NavbarComponent from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import CartSidebar from '../organisms/CartSidebar';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    // Validar nombre
    if (!formData.name) {
      newErrors.name = 'El nombre es requerido';
    } else if (formData.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres';
    }
    
    // Validar email
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    // Validar teléfono
    if (!formData.phone) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!/^[0-9]{8,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Teléfono inválido (mínimo 8 dígitos)';
    }
    
    // Validar contraseña
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // Validar confirmación de contraseña
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
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
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Limpiar error general
    if (showError) {
      setShowError(false);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowError(false);
    setErrorMessage('');
    setShowSuccess(false);
    setIsLoading(true);
    
    if (validateForm()) {
      try {
        console.log('📝 Intentando registrar usuario:', formData.email);
        
        // ✅ CORREGIDO: Pasar parámetros separados
        const result = await register(
          formData.name, 
          formData.email, 
          formData.password
        );
        
        console.log('📋 Resultado del registro:', result);
        
        if (result.success) {
          console.log('✅ Registro exitoso, redirigiendo...');
          setShowSuccess(true);
          setTimeout(() => {
            navigate('/productos');
          }, 1500);
        } else {
          // Manejar errores específicos
          if (result.error === "USER_ALREADY_EXISTS") {
            setErrorMessage('❌ Este email ya está registrado. ¿Ya tienes cuenta?');
          } else {
            setErrorMessage('❌ Error en el registro. Intenta nuevamente.');
          }
          setShowError(true);
          
          // Lanzar error JavaScript
          console.error('🚨 ERROR DE REGISTRO:', {
            email: formData.email,
            error: result.error,
            message: 'Error en el proceso de registro'
          });
        }
      } catch (error) {
        console.error('💥 Error en el proceso de registro:', error);
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
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">Crear Cuenta</h2>
                  <p className="text-muted">Únete a HuertoHogar</p>
                </div>

                {showSuccess && (
                  <Alert variant="success" className="border-0 shadow-sm">
                    <div className="d-flex align-items-center">
                      <span className="fw-bold me-2">✅</span>
                      <span>¡Cuenta creada exitosamente! Redirigiendo...</span>
                    </div>
                  </Alert>
                )}

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
                        {errorMessage.includes('ya está registrado') && (
                          <div className="mt-2">
                            <Link to="/login" className="btn btn-sm btn-outline-danger">
                              Iniciar Sesión
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre Completo *</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Juan Pérez"
                      value={formData.name}
                      onChange={handleChange}
                      isInvalid={!!errors.name}
                      disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email *</Form.Label>
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

                  <Form.Group className="mb-3">
                    <Form.Label>Teléfono *</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      placeholder="+56 9 1234 5678"
                      value={formData.phone}
                      onChange={handleChange}
                      isInvalid={!!errors.phone}
                      disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.phone}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Contraseña *</Form.Label>
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

                  <Form.Group className="mb-4">
                    <Form.Label>Confirmar Contraseña *</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                      disabled={isLoading}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.confirmPassword}
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
                        Creando cuenta...
                      </>
                    ) : (
                      'Crear Cuenta'
                    )}
                  </Button>

                  <div className="text-center">
                    <p className="mb-0">
                      ¿Ya tienes cuenta? <Link to="/login" className="fw-bold text-success">Inicia sesión aquí</Link>
                    </p>
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