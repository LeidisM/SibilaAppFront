import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import '../../styles/formStyles.css';

const CrearUsuario = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    documento: '',
    correoElectronico: '',
    contrasena: '',
    rolId: ''
  });

  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // ✅ Cargar roles desde la API
  useEffect(() => {
    axios.get('http://localhost:5242/api/Roles')
      .then(response => setRoles(response.data))
      .catch(error => console.error("Error al cargar roles", error));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!usuario.nombre) newErrors.nombre = 'Nombre requerido';
    if (!usuario.apellido) newErrors.apellido = 'Apellido requerido';
    if (!usuario.tipoDocumento) newErrors.tipoDocumento = 'Tipo de documento requerido';
    if (!usuario.documento) newErrors.documento = 'Documento requerido';
    if (!usuario.correoElectronico) newErrors.correoElectronico = 'Correo requerido';
    if (!usuario.contrasena) newErrors.contrasena = 'Contraseña requerida';
    if (!usuario.rolId) newErrors.rolId = 'Rol requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:5242/api/Usuarios', usuario);
      setShowSuccess(true);
      setUsuario({
        nombre: '',
        apellido: '',
        tipoDocumento: '',
        documento: '',
        correoElectronico: '',
        contrasena: '',
        rolId: ''
      });

      setTimeout(() => {
        setShowSuccess(false);
        navigate('/usuarios');
      }, 2000);
    } catch (error) {
      console.error("Error al crear usuario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><i className="fas fa-user-plus me-2"></i> Crear Usuario</h2>
        <Button variant="outline-secondary" onClick={() => navigate('/usuarios')}>
          <i className="fas fa-arrow-left me-2"></i> Volver a la lista
        </Button>
      </div>

      {showSuccess && (
        <Alert variant="success">✅ Usuario creado correctamente.</Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input className="form-control" value={usuario.nombre}
            onChange={e => setUsuario({ ...usuario, nombre: e.target.value })} />
          {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
        </div>

        <div className="mb-3">
          <label>Apellido</label>
          <input className="form-control" value={usuario.apellido}
            onChange={e => setUsuario({ ...usuario, apellido: e.target.value })} />
          {errors.apellido && <div className="text-danger">{errors.apellido}</div>}
        </div>

        <div className="mb-3">
          <label>Tipo de Documento</label>
          <select className="form-select" value={usuario.tipoDocumento}
          onChange={e => setUsuario({ ...usuario, tipoDocumento: parseInt(e.target.value) })}>
          <option value="">Seleccione</option> 
          <option value="1">Cédula de Ciudadanía</option>
          <option value="2">Tarjeta de Identidad</option>
          <option value="3">Cédula de Extranjería</option>
        </select>

          {errors.tipoDocumento && <div className="text-danger">{errors.tipoDocumento}</div>}
        </div>

        <div className="mb-3">
          <label>Documento</label>
          <input className="form-control" value={usuario.documento}
            onChange={e => setUsuario({ ...usuario, documento: e.target.value })} />
          {errors.documento && <div className="text-danger">{errors.documento}</div>}
        </div>

        <div className="mb-3">
          <label>Correo Electrónico</label>
          <input type="email" className="form-control" value={usuario.correoElectronico}
            onChange={e => setUsuario({ ...usuario, correoElectronico: e.target.value })} />
          {errors.correoElectronico && <div className="text-danger">{errors.correoElectronico}</div>}
        </div>

        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" className="form-control" value={usuario.contrasena}
            onChange={e => setUsuario({ ...usuario, contrasena: e.target.value })} />
          {errors.contrasena && <div className="text-danger">{errors.contrasena}</div>}
        </div>

        <div className="mb-3">
          <label>Rol</label>
          <select className="form-select" value={usuario.rolId}
            onChange={e => setUsuario({ ...usuario, rolId: parseInt(e.target.value) })}>
            <option value="">Seleccione un rol</option>
            {roles.map((rol) => (
              <option key={rol.id} value={rol.id}>{rol.nombre}</option>
            ))}
          </select>
          {errors.rolId && <div className="text-danger">{errors.rolId}</div>}
        </div>

        <div className="d-flex justify-content-end">
          <Button type="submit" variant="success" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar Usuario'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CrearUsuario;

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Alert } from 'react-bootstrap';
import '../../styles/formStyles.css';

const CrearUsuario = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: '',
    apellido: '',
    tipoDocumento: '',
    documento: '',
    correoElectronico: '',
    contrasena: '',
    rolId: ''
  });

  const [roles, setRoles] = useState([]); // aquí guardaremos los roles desde la API
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 🔽 Cargar los roles desde la API
  useEffect(() => {
    axios.get('http://localhost:5242/api/Roles')
      .then(response => setRoles(response.data))
      .catch(error => console.error("Error al cargar los roles:", error));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!usuario.nombre) newErrors.nombre = 'Nombre requerido';
    if (!usuario.apellido) newErrors.apellido = 'Apellido requerido';
    if (!usuario.tipoDocumento) newErrors.tipoDocumento = 'Tipo de documento requerido';
    if (!usuario.documento) newErrors.documento = 'Documento requerido';
    if (!usuario.correoElectronico) newErrors.correoElectronico = 'Correo requerido';
    if (!usuario.contrasena) newErrors.contrasena = 'Contraseña requerida';
    if (!usuario.rolId) newErrors.rolId = 'Rol requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:5242/api/Usuarios', usuario);
      setShowSuccess(true);
      setUsuario({
        nombre: '',
        apellido: '',
        tipoDocumento: '',
        documento: '',
        correoElectronico: '',
        contrasena: '',
        rolId: ''
      });
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/usuarios');
      }, 3000);
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2><i className="fas fa-user-plus me-2"></i> Crear Usuario</h2>
        <Button variant="outline-secondary" onClick={() => navigate('/usuarios')}>
          <i className="fas fa-arrow-left me-2"></i> Volver a la lista
        </Button>
      </div>

      {showSuccess && (
        <Alert variant="success">✅ Usuario creado correctamente.</Alert>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input className="form-control" value={usuario.nombre}
            onChange={e => setUsuario({ ...usuario, nombre: e.target.value })} />
          {errors.nombre && <div className="text-danger">{errors.nombre}</div>}
        </div>

        <div className="mb-3">
          <label>Apellido</label>
          <input className="form-control" value={usuario.apellido}
            onChange={e => setUsuario({ ...usuario, apellido: e.target.value })} />
          {errors.apellido && <div className="text-danger">{errors.apellido}</div>}
        </div>

        <div className="mb-3">
          <label>Tipo de Documento</label>
          <select className="form-select" value={usuario.tipoDocumento}
            onChange={e => setUsuario({ ...usuario, tipoDocumento: e.target.value })}>
            <option value="">Seleccione</option>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="TI">Tarjeta de Identidad</option>
            <option value="CedulaExtranjeria">Cédula de Extranjería</option>
          </select>
          {errors.tipoDocumento && <div className="text-danger">{errors.tipoDocumento}</div>}
        </div>

        <div className="mb-3">
          <label>Documento</label>
          <input className="form-control" value={usuario.documento}
            onChange={e => setUsuario({ ...usuario, documento: e.target.value })} />
          {errors.documento && <div className="text-danger">{errors.documento}</div>}
        </div>

        <div className="mb-3">
          <label>Correo Electrónico</label>
          <input type="email" className="form-control" value={usuario.correoElectronico}
            onChange={e => setUsuario({ ...usuario, correoElectronico: e.target.value })} />
          {errors.correoElectronico && <div className="text-danger">{errors.correoElectronico}</div>}
        </div>

        <div className="mb-3">
          <label>Contraseña</label>
          <input type="password" className="form-control" value={usuario.contrasena}
            onChange={e => setUsuario({ ...usuario, contrasena: e.target.value })} />
          {errors.contrasena && <div className="text-danger">{errors.contrasena}</div>}
        </div>

        <div className="mb-3">
          <label>Rol</label>
          <select className="form-select" value={usuario.rolId}
            onChange={e => setUsuario({ ...usuario, rolId: parseInt(e.target.value) })}>
            <option value="">Seleccione un rol</option>
            {roles.map(rol => (
              <option key={rol.id} value={rol.id}>
                {rol.nombre}
              </option>
            ))}
          </select>
          {errors.rolId && <div className="text-danger">{errors.rolId}</div>}
        </div>

        <div className="d-flex justify-content-end">
          <Button type="submit" variant="success" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar Usuario'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CrearUsuario;*/

