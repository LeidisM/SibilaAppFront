import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Alert, Spinner } from 'react-bootstrap';
import api from '../../ApiConnection/Api';

const DetallePrestamo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prestamo, setPrestamo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Mapeo de tipos de documento
  const tipoDocumentoTexto = {
    1: 'Cédula de Ciudadanía',
    2: 'Tarjeta de Identidad',
    3: 'Cédula de Extranjería'
  };

  useEffect(() => {
    const fetchPrestamo = async () => {
      try {
        const response = await api.get(`/Prestamos/GetPrestamo/${id}`);
        setPrestamo(response.data);
      } catch (error) {
        console.error("Error al obtener el Prestamo:", error);
        setError("No se pudo cargar la información del prestamo");
      } finally {
        setLoading(false);
      }
    };

    fetchPrestamo();
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
        <Button variant="secondary" onClick={() => navigate('/prestamos')} className="mt-3">
          Volver a la lista de prestamos
        </Button>
      </div>
    );
  }

  if (!prestamo) {
    return (
      <div className="container mt-4">
        <Alert variant="warning">
          <i className="fas fa-user-slash me-2"></i>
          Prestamo no encontrado
        </Alert>
        <Button variant="secondary" onClick={() => navigate('/prestamos')} className="mt-3">
          Volver a la lista de prestamos
        </Button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#6bbf3d' }}>
          <i className="fas fa-user-circle me-2"></i>
          Información del prestamo
        </h2>
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate('/prestamos')}
        >
          <i className="fas fa-arrow-left me-2"></i> Volver
        </Button>
      </div>

      <Card>
        <Card.Header style={{ backgroundColor: '#6bbf3d', color: 'white' }}>
          <h5 className="mb-0">Datos del prestamo</h5>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Fecha prestamo:</h6>
            <p>{prestamo.fechaPrestamo}</p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Titulo:</h6>
            <p>{prestamo.libro.titulo}</p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Autor:</h6>
            <p>{prestamo.libro.autor}</p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Documento:</h6>
            <p>{prestamo.usuario.documento}</p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Nombre:</h6>
            <p>{prestamo.usuario.nombre}</p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Apellido:</h6>
            <p>{prestamo.usuario.apellido}</p>
          </div>
          
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetallePrestamo;