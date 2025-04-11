import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-wrapper">
      <nav className="sidebar">
        <h2>Menú</h2>
        <Link to="/">Inicio</Link>
        <Link to="/usuarios">Usuarios</Link>
        <Link to="/libros">Libros</Link>
        <Link to="/prestamos">Préstamos</Link>
        <Link to="/devoluciones">Devoluciones</Link>
      </nav>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
