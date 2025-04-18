import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../ApiConnection/Api';

const Libros = () => {
  const navigate = useNavigate();
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mapeo de estados
  const estadoTexto = {
    0: 'Disponible',
    1: 'Prestado',
    2: 'Dañado',
    3: 'Extraviado'
  };

  useEffect(() => {
    api.get("/Libros")
      .then(response => {
        setLibros(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener los libros:", error);
        setLoading(false);
        alert("Ocurrió un error al cargar los libros.");
      });
  }, []);

  const filteredLibros = useMemo(() => {
    if (!searchTerm) return libros;

    const lowercasedSearch = searchTerm.toLowerCase();
    return libros.filter(libro =>
      Object.values(libro).some(
        value => value && value.toString().toLowerCase().includes(lowercasedSearch)
      )
    );
  }, [libros, searchTerm]);

  const totalPages = Math.ceil(filteredLibros.length / itemsPerPage);
  const paginatedLibros = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredLibros.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredLibros, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    navigate(`/libros/editar/${id}`);
  };

  const handleView = (id) => {
    navigate(`/libros/detalle/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este libro?")) {
      api.delete(`/Libros/${id}`)
        .then(response => {
          setLibros(libros.filter(libro => libro.id !== id));
          alert("Libro eliminado correctamente.");
        })
        .catch(error => {
          console.error("Error al eliminar el libro:", error);
          alert("Ocurrió un error al eliminar el libro.");
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
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-book me-2"></i>
          Lista de Libros
        </h2>
        <button 
          className="btn btn-primary" 
          onClick={() => navigate('/libros/crear')}
        >
          <i className="fas fa-plus me-2"></i>
          Nuevo Libro
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
          Mostrando {paginatedLibros.length} de {filteredLibros.length} libros encontrados
        </small>
      </div>

      {/* Selector de elementos por página */}
      <div className="mb-3">
        <select 
          className="form-select" 
          onChange={handleItemsPerPageChange} 
          value={itemsPerPage}
          style={{ width: '80px' }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      {/* Tabla de libros - Estilo idéntico a usuarios */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Editorial</th>
              <th>ISBN</th>
              <th>Subcategoría</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedLibros.length > 0 ? (
              paginatedLibros.map((libro) => (
                <tr key={libro.id}>
                  <td>{libro.titulo}</td>
                  <td>{libro.autor || '-'}</td>
                  <td>{libro.editorial || '-'}</td>
                  <td>{libro.isbn || '-'}</td>
                  <td>{libro.subcategoria || '-'}</td>
                  <td>{libro.tipoMaterial || '-'}</td>
                  <td>
                    <span className={`badge ${
                      libro.estado === 0 ? "bg-success" :
                      libro.estado === 1 ? "bg-warning text-dark" :
                      libro.estado === 2 ? "bg-danger" : "bg-secondary"
                    }`}>
                      {estadoTexto[libro.estado] || 'Desconocido'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-outline-primary me-2" 
                      onClick={() => handleView(libro.id)}
                      title="Ver detalles"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-secondary me-2" 
                      onClick={() => handleEdit(libro.id)}
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-danger" 
                      onClick={() => handleDelete(libro.id)}
                      title="Eliminar"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  {searchTerm ? "No se encontraron libros que coincidan con la búsqueda" : "No hay libros disponibles"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {filteredLibros.length > itemsPerPage && (
        <div className="d-flex justify-content-center mt-3">
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

export default Libros;