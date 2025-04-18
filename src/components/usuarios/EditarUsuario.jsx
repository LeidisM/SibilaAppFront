import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../ApiConnection/Api';

const EditarUsuario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Cargar datos del usuario
    api.get(`/Usuarios/${id}`)
      .then(response => {
        setUsuario(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener el usuario:", error);
        setError("Error al cargar los datos del usuario.");
        setLoading(false);
      });

    // Cargar los roles disponibles
    api.get("/Roles")
      .then(response => {
        setRoles(response.data);
      })
      .catch(error => {
        console.error("Error al cargar los roles:", error);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar datos antes de enviar
    if (!usuario.nombre || !usuario.apellido || !usuario.correoElectronico || !usuario.tipoDocumento || !usuario.documento || !usuario.rolId) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    api.put(`/Usuarios/${id}`, usuario)
      .then(response => {
        alert("Usuario actualizado correctamente.");
        navigate('/usuarios');
      })
      .catch(error => {
        console.error("Error al actualizar el usuario:", error);
        alert("Ocurrió un error al actualizar el usuario.");
      });
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

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <h2 className="mb-4">
        <i className="fas fa-edit me-2"></i>
        Editar Usuario
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={usuario.nombre}
            onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input
            type="text"
            id="apellido"
            className="form-control"
            value={usuario.apellido}
            onChange={(e) => setUsuario({ ...usuario, apellido: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="correoElectronico" className="form-label">Correo Electrónico</label>
          <input
            type="email"
            id="correoElectronico"
            className="form-control"
            value={usuario.correoElectronico}
            onChange={(e) => setUsuario({ ...usuario, correoElectronico: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="tipoDocumento" className="form-label">Tipo de Documento</label>
          <select
            id="tipoDocumento"
            className="form-select"
            value={usuario.tipoDocumento}
            onChange={(e) => setUsuario({ ...usuario, tipoDocumento: e.target.value })}
            required
          >
            <option value="1">Cédula de Ciudadanía</option>
            <option value="2">Tarjeta de Identidad</option>
            <option value="3">Cédula de Extranjería</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="documento" className="form-label">Documento</label>
          <input
            type="text"
            id="documento"
            className="form-control"
            value={usuario.documento}
            onChange={(e) => setUsuario({ ...usuario, documento: e.target.value })}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rolId" className="form-label">Rol</label>
          <select
            id="rolId"
            className="form-select"
            value={usuario.rolId}
            onChange={(e) => setUsuario({ ...usuario, rolId: e.target.value })}
            required
          >
            <option value="">Seleccionar rol</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>{rol.nombre}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Actualizar Usuario</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/usuarios')}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditarUsuario;
