import React from 'react';
import { Link, Outlet, useLocation, useNavigate  } from 'react-router-dom';
import { useAuth } from '../components/Autenticacion/AuthContext';
import '../styles/layout.css'; 

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout(navigate); // Pasa navigate como argumento según la solución anterior
  };

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
        
        {/* Botón de Logout en la parte inferior */}
        {user && (
          <div className="logout-container">
            <button 
              onClick={handleLogout}
              className="logout-btn"
            >
              <i className="fas fa-sign-out-alt"></i>
              Cerrar Sesión
            </button>
          </div>
        )}

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
