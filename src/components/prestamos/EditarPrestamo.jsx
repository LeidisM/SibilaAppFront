import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import '../../styles/formStyles.css';

const EditarPrestamo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [prestamo, setPrestamo] = useState({
    documentoUsuario: '',
    ISBNLibro: '',
    id: 0
  });

  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const response = await axios.get(`http://localhost:5242/api/Prestamos/GetPrestamo/${id}`);
        setPrestamo({
          id: response.data.id,
          documentoUsuario: response.data.usuario.documento,
          ISBNLibro: response.data.libro.isbn
        });
      } catch (error) {
        console.error("Error al obtener el libro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLibro();
  }, [id]);

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
      await axios.post('http://localhost:5242/api/Prestamos/EditarPrestamo', prestamo);
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

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><i className="fas fa-edit me-2"></i> Editar Prestamo</h2>
        <Button variant="outline-secondary" onClick={() => navigate('/prestamos')}>
          <i className="fas fa-arrow-left me-2"></i> Volver a la lista
        </Button>
      </div>

      {showSuccess && (
        <Alert variant="success">✅ Prestamo editado correctamente.</Alert>
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

export default EditarPrestamo;

