import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/Autenticacion/AuthContext';
import PrivateRoute from './components/Autenticacion/PrivateRoute';
import Layout from './layout/Layout';
import Inicio from './components/Inicio';
import Login from './components/Autenticacion/Login';
import Libros from './components/libros/Libros';
import Usuarios from './components/usuarios/Usuarios';
import Prestamos from './components/prestamos/Prestamos';
import DetallePrestamo from './components/prestamos/DetallePrestamo';
import CrearPrestamo from './components/prestamos/CrearPrestamo';
import EditarPrestamo from './components/prestamos/EditarPrestamo';
import Devoluciones from './components/devoluciones/Devoluciones';
import CrearUsuario from './components/usuarios/CrearUsuario';
import EditarUsuario from './components/usuarios/EditarUsuario';
import DetalleUsuario from './components/usuarios/DetalleUsuario';
import EditarLibro from './components/libros/EditarLibro';
import DetalleLibro from './components/libros/DetalleLibro';
import CrearLibro from './components/libros/CrearLibro';

// importa aquí otros componentes que uses
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<Login />} />
          
          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
            <Route index element={<Inicio />} />  { }
            <Route path="libros" element={<Libros />} />
            <Route path="/libros/editar/:id" element={<EditarLibro />} />
            <Route path="/libros/detalle/:id" element={<DetalleLibro />} />
            <Route path="/libros/crear" element={<CrearLibro />} />      
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="usuarios/crear" element={<CrearUsuario />} />
            <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
            <Route path="usuarios/detalle/:id" element={<DetalleUsuario />} />    
            <Route path="prestamos/detalle/:id" element={<DetallePrestamo />} />
            <Route path="prestamos/crear" element={<CrearPrestamo />} />
            <Route path="prestamos/editar/:id" element={<EditarPrestamo />} />
            <Route path="prestamos" element={<Prestamos />} />          
            <Route path="devoluciones" element={<Devoluciones />} />
            </Route>
          </Route>
          
          {/* Redirección para rutas no encontradas */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;


/*
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />  {/* <- Esto es crucial }
          <Route path="libros" element={<Libros />} />
          <Route path="/libros/editar/:id" element={<EditarLibro />} />
          <Route path="/libros/detalle/:id" element={<DetalleLibro />} />
          <Route path="/libros/crear" element={<CrearLibro />} />      
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="usuarios/crear" element={<CrearUsuario />} />
          <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
          <Route path="usuarios/detalle/:id" element={<DetalleUsuario />} />    
          <Route path="prestamos/detalle/:id" element={<DetallePrestamo />} />
          <Route path="prestamos/crear" element={<CrearPrestamo />} />
          <Route path="prestamos/editar/:id" element={<EditarPrestamo />} />
          <Route path="prestamos" element={<Prestamos />} />          
          <Route path="devoluciones" element={<Devoluciones />} />
          {/* otras rutas }
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export default App;*/