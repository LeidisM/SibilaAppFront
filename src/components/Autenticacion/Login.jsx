import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; 
import { Button, Form, Alert } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
  
    try {
      const response = await axios.post('http://localhost:5242/api/Autenticacion/login', {
        Email: email,
        Password: password
      });
  
      // Verifica que la respuesta tenga la estructura esperada
      if (response.data && response.data.token && response.data.user) {
        login(response.data.token, response.data.user, navigate);
      } else {
        throw new Error('La respuesta del servidor no tiene el formato esperado');
      }
    } catch (err) {
      // Manejo mejorado de errores
      let errorMessage = 'Error al iniciar sesión';
      
      if (err.response) {
        // Error de respuesta HTTP (4xx, 5xx)
        errorMessage = err.response.data?.message || err.response.statusText || errorMessage;
      } else if (err.request) {
        // Error de solicitud (no hubo respuesta)
        errorMessage = 'No se recibió respuesta del servidor';
      } else {
        // Error al configurar la solicitud
        errorMessage = err.message || errorMessage;
      }
  
      setError(errorMessage);
      console.error('Error en login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">
                <i className="fas fa-sign-in-alt me-2"></i>Iniciar Sesión
              </h2>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Ingrese su correo"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Ingrese su contraseña"
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;