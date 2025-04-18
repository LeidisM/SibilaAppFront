import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card, Alert, Spinner } from 'react-bootstrap';
import api from '../../ApiConnection/Api';

const DetalleLibro = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Libro, setLibro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const response = await api.get(`/Libros/${id}`);
        setLibro(response.data);
      } catch (error) {
        console.error("Error al obtener el Libro:", error);
        setError("No se pudo cargar la información del Libro");
      } finally {
        setLoading(false);
      }
    };

    fetchLibro();
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
        <Button variant="secondary" onClick={() => navigate('/Libros')} className="mt-3">
          Volver a la lista de Libros
        </Button>
      </div>
    );
  }

  if (!Libro) {
    return (
      <div className="container mt-4">
        <Alert variant="warning">
          <i className="fas fa-user-slash me-2"></i>
          Libro no encontrado
        </Alert>
        <Button variant="secondary" onClick={() => navigate('/Libros')} className="mt-3">
          Volver a la lista de Libros
        </Button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#6bbf3d' }}>
          <i className="fas fa-user-circle me-2"></i>
          Información del Libro
        </h2>
        <Button 
          variant="outline-secondary" 
          onClick={() => navigate('/Libros')}
        >
          <i className="fas fa-arrow-left me-2"></i> Volver
        </Button>
      </div>

      <Card>
        <Card.Header style={{ backgroundColor: '#6bbf3d', color: 'white' }}>
          <h5 className="mb-0">Datos del libro</h5>
        </Card.Header>
        <Card.Body>
          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Titulo:</h6>
            <p>{Libro.titulo}</p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Autor:</h6>
            <p>{Libro.autor}</p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Editorial:</h6>
            <p>{Libro.editorial}</p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>ISBN:</h6>
            <p>{Libro.isbn}</p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Subcategoría:</h6>
            <p>{Libro.subcategoria}</p>
          </div>

          <div className="mb-3">
            <h6 style={{ color: '#6bbf3d' }}>Tipo de Material:</h6>
            <p>{Libro.tipoMaterial}</p>
          </div>          
        </Card.Body>
      </Card>
    </div>
  );
};

export default DetalleLibro;