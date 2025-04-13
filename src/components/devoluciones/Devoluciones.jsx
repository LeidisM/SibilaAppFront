import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';

const Devoluciones = () => {
  const [devoluciones, setDevoluciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // REEMPLAZAR CON EL ENDPOINT CORRECTO
    axios.get("http://localhost:5242/api/Devoluciones")
      .then(response => {
        setDevoluciones(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener las devoluciones:", error);
        setLoading(false);
      });
  }, []);

  const filteredDevoluciones = useMemo(() => {
    if (!searchTerm) return devoluciones;
    
    const lowercasedSearch = searchTerm.toLowerCase();
    return devoluciones.filter(devolucion => 
      Object.values(devolucion).some(
        value => value && value.toString().toLowerCase().includes(lowercasedSearch)
      )
    );
  }, [devoluciones, searchTerm]);

  const totalPages = Math.ceil(filteredDevoluciones.length / itemsPerPage);
  const paginatedDevoluciones = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDevoluciones.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDevoluciones, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
          <i className="fas fa-undo me-2"></i>
          Lista de Devoluciones
        </h2>
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
          Mostrando {paginatedDevoluciones.length} de {filteredDevoluciones.length} devoluciones encontradas
        </small>
      </div>

      {/* Tabla de devoluciones */}
      <div className="table-responsive mb-3">
        <table className="table table-hover table-bordered">
          <thead className="table-light">
            <tr>
              <th>Usuario</th>
              <th>Apellido</th>
              <th>Documento</th>
              <th>Libro</th>
              <th>Autor</th>
              <th>Fecha Préstamo</th>
              <th>Fecha Devolución</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDevoluciones.length > 0 ? (
              paginatedDevoluciones.map((devolucion) => (
                <tr key={devolucion.id}>
                  <td>{devolucion.usuario?.nombre || 'N/A'}</td>
                  <td>{devolucion.usuario?.apellido || 'N/A'}</td>
                  <td>{devolucion.usuario?.documento || 'N/A'}</td>
                  <td>{devolucion.libro?.titulo || 'N/A'}</td>
                  <td>{devolucion.libro?.autor || 'N/A'}</td>
                  <td>{new Date(devolucion.fechaPrestamo).toLocaleDateString()}</td>
                  <td>{new Date(devolucion.fechaDevolucion).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  {searchTerm ? "No se encontraron devoluciones que coincidan con la búsqueda" : "No hay devoluciones registradas"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {filteredDevoluciones.length > itemsPerPage && (
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

export default Devoluciones;