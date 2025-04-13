/*import React from 'react';
import { Link, Outlet } from 'react-router-dom';
//import './Layout.css';
import '../styles/layout.css'; 

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
*/

import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../styles/layout.css'; 

const Layout = () => {
  const location = useLocation();

  return (
    <div className="layout-wrapper">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Sibila App</h2>
        </div>
        <nav className="sidebar-nav">
          <Link 
            to="/" 
            className={`sidebar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <i className="fas fa-home"></i> Inicio
          </Link>
          <Link 
            to="/usuarios" 
            className={`sidebar-link ${location.pathname.startsWith('/usuarios') ? 'active' : ''}`}
          >
            <i className="fas fa-users"></i> Usuarios
          </Link>
          <Link 
            to="/libros" 
            className={`sidebar-link ${location.pathname.startsWith('/libros') ? 'active' : ''}`}
          >
            <i className="fas fa-book"></i> Libros
          </Link>
          <Link 
            to="/prestamos" 
            className={`sidebar-link ${location.pathname.startsWith('/prestamos') ? 'active' : ''}`}
          >
            <i className="fas fa-exchange-alt"></i> Préstamos
          </Link>
          <Link 
            to="/devoluciones" 
            className={`sidebar-link ${location.pathname.startsWith('/devoluciones') ? 'active' : ''}`}
          >
            <i className="fas fa-undo"></i> Devoluciones
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        <div className="content-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
