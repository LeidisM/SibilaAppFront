import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Libros = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5242/api/Libros") // Asegúrate de usar el puerto que aparece en Swagger
      .then(response => {
        setLibros(response.data);
      })
      .catch(error => {
        console.error("Error al obtener los libros:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2>📚 Lista de Libros</h2>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Editorial</th>
            <th>ISBN</th>
            <th>Subcategoría</th>
            <th>Tipo de Material</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
  {libros.map((libro) => (
    <tr key={libro.id}>
      <td>{libro.id}</td>
      <td>{libro.titulo}</td>
      <td>{libro.autor}</td>
      <td>{libro.editorial}</td>
      <td>{libro.isbn}</td>
      <td>{libro.subcategoria}</td>
      <td>{libro.tipoMaterial}</td>
      <td>
        {libro.estado === 0 ? "Disponible" :
         libro.estado === 1 ? "Prestado" :
         libro.estado === 2 ? "Dañado" : "Otro"}
      </td>      
      <td>
        <button className="btn btn-primary btn-sm me-2">Detalles</button>
        <button className="btn btn-warning btn-sm me-2">Editar</button>
        <button className="btn btn-danger btn-sm">Eliminar</button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
  
};

export default Libros;
