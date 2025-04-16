import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const CrearLibro = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [libro, setLibro] = useState({
    titulo: '',
    autor: '',
    editorial: '',
    isbn: '',
    subcategoria: '',
    tipoMaterial: '',
    estado: 0
  });

  //const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  

  const validate = () => {
    const newErrors = {};
    if (!libro.titulo) newErrors.titulo = 'Título requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await axios.post(`http://localhost:5242/api/Libros`, libro);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/libros');
      }, 1500);
    } catch (error) {
      console.error("Error al crear el libro:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-edit me-2"></i>
          Crear Libro
        </h2>
        <button 
          className="btn btn-outline-secondary"
          onClick={() => navigate('/libros')}
        >
          <i className="fas fa-arrow-left me-2"></i>
          Volver
        </button>
      </div>

      {showSuccess && (
        <Alert variant="success" className="mb-4">
          <i className="fas fa-check-circle me-2"></i>
          Libro creado correctamente
        </Alert>
      )}

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="titulo" className="form-label">Título*</label>
                <input
                  type="text"
                  id="titulo"
                  className={`form-control ${errors.titulo ? 'is-invalid' : ''}`}
                  value={libro.titulo}
                  onChange={(e) => setLibro({ ...libro, titulo: e.target.value })}
                />
                {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
              </div>

              <div className="col-md-6">
                <label htmlFor="autor" className="form-label">Autor</label>
                <input
                  type="text"
                  id="autor"
                  className="form-control"
                  value={libro.autor || ''}
                  onChange={(e) => setLibro({ ...libro, autor: e.target.value })}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="editorial" className="form-label">Editorial</label>
                <input
                  type="text"
                  id="editorial"
                  className="form-control"
                  value={libro.editorial || ''}
                  onChange={(e) => setLibro({ ...libro, editorial: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="isbn" className="form-label">ISBN</label>
                <input
                  type="text"
                  id="isbn"
                  className="form-control"
                  value={libro.isbn || ''}
                  onChange={(e) => setLibro({ ...libro, isbn: e.target.value })}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="subcategoria" className="form-label">Subcategoría</label>
                <input
                  type="text"
                  id="subcategoria"
                  className="form-control"
                  value={libro.subcategoria || ''}
                  onChange={(e) => setLibro({ ...libro, subcategoria: e.target.value })}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="tipoMaterial" className="form-label">Tipo de Material</label>
                <input
                  type="text"
                  id="tipoMaterial"
                  className="form-control"
                  value={libro.tipoMaterial || ''}
                  onChange={(e) => setLibro({ ...libro, tipoMaterial: e.target.value })}
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label htmlFor="estado" className="form-label">Estado</label>
                <select
                  id="estado"
                  className="form-select"
                  value={libro.estado}
                  onChange={(e) => setLibro({ ...libro, estado: parseInt(e.target.value) })}
                >
                  <option value={0}>Disponible</option>
                  <option value={1}>Prestado</option>
                  <option value={2}>Dañado</option>
                  <option value={3}>Extraviado</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-save me-2"></i>
                    Guardar
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearLibro;