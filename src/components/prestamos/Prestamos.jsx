import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../ApiConnection/Api';

const Prestamos = () => {
  const navigate = useNavigate();
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // REEMPLAZAR CON EL ENDPOINT CORRECTO
    api.get("/Prestamos/GetPrestamos")
      .then(response => {
        setPrestamos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener los préstamos:", error);
        setLoading(false);
      });
  }, []);

  const filteredPrestamos = useMemo(() => {
    if (!searchTerm) return prestamos;
    
    const lowercasedSearch = searchTerm.toLowerCase();
    return prestamos.filter(prestamo => 
      Object.values(prestamo).some(
        value => value && value.toString().toLowerCase().includes(lowercasedSearch)
    ));
  }, [prestamos, searchTerm]);

  const totalPages = Math.ceil(filteredPrestamos.length / itemsPerPage);
  const paginatedPrestamos = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPrestamos.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPrestamos, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (id) => {
    navigate(`/prestamos/editar/${id}`);
  };

  const handleView = (id) => {
    navigate(`/prestamos/detalle/${id}`);
  };

  const handleDevolver = (id) => {
    // Lógica para eliminar prestamo, ejemplo de confirmación:
    if (window.confirm("El prestamo se cerrará")) {
      api.post(`/Prestamos/Devolver/${id}`)
        .then(() => {
          setPrestamos(prestamos.filter(prestamo => prestamo.id !== id)); // Actualiza el estado
          alert("Prestamo cerrado correctamente.");
        })
        .catch(error => {
          console.error("Error al devolver el prestamo:", error);
          alert("Ocurrió un error al devolver el prestamo.");
        });
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
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="fas fa-exchange-alt me-2"></i>
          Lista de Préstamos
        </h2>
        <button className="btn btn-primary" onClick={() => navigate('/prestamos/crear')}>
          <i className="fas fa-plus me-2"></i>
          Nuevo Préstamo
        </button>
      </div>

      {/* Buscador */}
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar en todos los campos..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          {searchTerm && (
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => setSearchTerm('')}
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        <small className="text-muted">
          Mostrando {paginatedPrestamos.length} de {filteredPrestamos.length} préstamos encontrados
        </small>
      </div>

      {/* Tabla de préstamos */}
      <div className="table-responsive mb-3">
        <table className="table table-hover table-bordered">
          <thead className="table-light">
            <tr>
              <th>Usuario</th>
              <th>Apellido</th>
              <th>Documento</th>
              <th>Libro</th>
              <th>Fecha Préstamo</th>
              <th>Fecha Devolución</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPrestamos.length > 0 ? (
              paginatedPrestamos.map((prestamo) => (
                <tr key={prestamo.id}>
                  <td>{prestamo.usuario?.nombre || 'N/A'}</td>
                  <td>{prestamo.usuario?.apellido || 'N/A'}</td>
                  <td>{prestamo.usuario?.documento || 'N/A'}</td>
                  <td>{prestamo.libro?.titulo || 'N/A'}</td>
                  <td>{new Date(prestamo.fechaPrestamo).toLocaleDateString()}</td>
                  <td>{prestamo.fechaDevolucion ? new Date(prestamo.fechaDevolucion).toLocaleDateString() : 'Pendiente'}</td>
                  <td className="d-flex gap-2">
                    <button className="btn btn-sm btn-warning" onClick={() => handleDevolver(prestamo.id)}>
                      <i className="fas fa-undo me-1"></i> Devolver
                    </button>
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(prestamo.id)} aria-label="Editar prestamo">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleView(prestamo.id)} aria-label="Ver detalles prestamo">
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  {searchTerm ? "No se encontraron préstamos que coincidan con la búsqueda" : "No hay préstamos disponibles"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {filteredPrestamos.length > itemsPerPage && (
        <div className="d-flex justify-content-center">
          <Pagination>
            <Pagination.First 
              onClick={() => handlePageChange(1)} 
              disabled={currentPage === 1} 
            />
            <Pagination.Prev 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1} 
            />
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              
              return (
                <Pagination.Item
                  key={pageNumber}
                  active={pageNumber === currentPage}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Pagination.Item>
              );
            })}
            
            <Pagination.Next 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages} 
            />
            <Pagination.Last 
              onClick={() => handlePageChange(totalPages)} 
              disabled={currentPage === totalPages} 
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default Prestamos;