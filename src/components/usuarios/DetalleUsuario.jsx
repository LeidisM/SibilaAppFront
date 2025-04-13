import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Alert, Spinner } from 'react-bootstrap';

const DetalleUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mapeo de tipos de documento
  const tipoDocumentoTexto = {
    1: 'Cédula de Ciudadanía',
    2: 'Tarjeta de Identidad',
    3: 'Cédula de Extranjería'
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:5242/api/Usuarios/${id}`);
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
        setError("No se pudo cargar la información del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">
          <i className="fas fa-exclamation-triangle me-2"></i>
          {error}
        </Alert>
        <Button variant="secondary" onClick={() => navigate('/usuarios')} className="mt-3">
          Volver a la lista de usuarios
        </Button>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="container mt-4">
        <Alert variant="warning">
          <i className="fas fa-user-slash me-2"></i>
          Usuario no encontrado
        </Alert>
        <Button variant="secondary" onClick={() => navigate('/usuarios')} className="mt-3">
          Volver a la lista de usuarios
        </Button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#6bbf3d' }}>
          <i className="fas fa-user-circle me-2"></i>
          Información del Usuario
        </h2>
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate('/usuarios')}
        >
          <i className="fas fa-arrow-left me-2"></i> Volver
        </Button>
      </div>

      <Card>
        <Card.Header style={{ backgroundColor: '#6bbf3d', color: 'white' }}>
          <h5 className="mb-0">Datos Personales</h5>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Nombre Completo:</h6>
            <p>{usuario.nombre} {usuario.apellido}</p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Tipo de Documento:</h6>
            <p>{tipoDocumentoTexto[usuario.tipoDocumento]}</p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Número de Documento:</h6>
            <p>{usuario.documento}</p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Correo Electrónico:</h6>
            <p>
              <a href={`mailto:${usuario.correoElectronico}`} style={{ color: '#6bbf3d' }}>
                {usuario.correoElectronico}
              </a>
            </p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Rol:</h6>
            <span 
              className="badge" 
              style={{ 
                backgroundColor: '#6bbf3d', 
                color: 'white',
                padding: '0.5em 1em',
                fontSize: '0.9em'
              }}
            >
              {usuario.rol?.nombre || 'Sin rol'}
            </span>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetalleUsuario;