import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // REEMPLAZAR CON EL ENDPOINT CORRECTO
    axios.get("http://localhost:5242/api/Usuarios")
      .then(response => {
        setUsuarios(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener los usuarios:", error);
        setLoading(false);
      });
  }, []);

  const filteredUsuarios = useMemo(() => {
    if (!searchTerm) return usuarios;
    
    const lowercasedSearch = searchTerm.toLowerCase();
    return usuarios.filter(usuario => 
      Object.values(usuario).some(
        value => value && value.toString().toLowerCase().includes(lowercasedSearch)
      )
    );
  }, [usuarios, searchTerm]);

  const totalPages = Math.ceil(filteredUsuarios.length / itemsPerPage);
  const paginatedUsuarios = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsuarios.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsuarios, currentPage, itemsPerPage]);

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
          <i className="fas fa-users me-2"></i>
          Lista de Usuarios
        </h2>
        <button className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>
          Nuevo Usuario
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
          Mostrando {paginatedUsuarios.length} de {filteredUsuarios.length} usuarios encontrados
        </small>
      </div>

      {/* Tabla de usuarios */}
      <div className="table-responsive mb-3">
        <table className="table table-hover table-bordered">
          <thead className="table-light">
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Rol</th>
              <th>Tipo Documento</th>
              <th>Documento</th>
              <th>Correo Electrónico</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsuarios.length > 0 ? (
              paginatedUsuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.rol}</td>
                  <td>{usuario.tipoDocumento}</td>
                  <td>{usuario.documento}</td>
                  <td>{usuario.correoElectronico}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-secondary me-2">
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger">
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  {searchTerm ? "No se encontraron usuarios que coincidan con la búsqueda" : "No hay usuarios disponibles"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {filteredUsuarios.length > itemsPerPage && (
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

export default Usuarios;