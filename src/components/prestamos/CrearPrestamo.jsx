import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import '../../styles/formStyles.css';
import api from '../../ApiConnection/Api';

const CrearPrestamo = () => {
  const navigate = useNavigate();

  const [prestamo, setPrestamo] = useState({
    documentoUsuario: '',
    ISBNLibro: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!prestamo.documentoUsuario) newErrors.documentoUsuario = 'El documento es requerido';
    if (!prestamo.ISBNLibro) newErrors.ISBNLibro = 'El ISBN requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await api.post('http://localhost:5242/api/Prestamos/CrearPrestamo', prestamo);
      setShowSuccess(true);
      setPrestamo({
        documentoUsuario: '',
        ISBNLibro: ''
      });

      setTimeout(() => {
        setShowSuccess(false);
        navigate('/prestamos');
      }, 2000);
    } catch (error) {
      console.error("Error al crear prestamo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><i className="fas fa-edit me-2"></i> Crear Prestamo</h2>
        <Button variant="outline-secondary" onClick={() => navigate('/prestamos')}>
          <i className="fas fa-arrow-left me-2"></i> Volver a la lista
        </Button>
      </div>

      {showSuccess && (
        <Alert variant="success">✅ Prestamo creado correctamente.</Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Documento usuario</label>
          <input className="form-control" value={prestamo.documentoUsuario}
            onChange={e => setPrestamo({ ...prestamo, documentoUsuario: e.target.value })} />
          {errors.documentoUsuario && <div className="text-danger">{errors.documentoUsuario}</div>}
        </div>

        <div className="mb-3">
          <label>ISBN</label>
          <input className="form-control" value={prestamo.ISBNLibro}
            onChange={e => setPrestamo({ ...prestamo, ISBNLibro: e.target.value })} />
          {errors.ISBNLibro && <div className="text-danger">{errors.ISBNLibro}</div>}
        </div>        

        <div className="d-flex justify-content-end">
          <Button type="submit" variant="success" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar Prestamo'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CrearPrestamo;

