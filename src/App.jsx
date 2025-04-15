import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Inicio from './components/Inicio';
import Libros from './components/libros/Libros';
import Usuarios from './components/usuarios/Usuarios';
import Prestamos from './components/prestamos/Prestamos';
import DetallePrestamo from './components/prestamos/DetallePrestamo';
import Devoluciones from './components/devoluciones/Devoluciones';
import CrearUsuario from './components/usuarios/CrearUsuario';
import EditarUsuario from './components/usuarios/EditarUsuario';
import DetalleUsuario from './components/usuarios/DetalleUsuario';
import EditarLibro from './components/libros/EditarLibro';
import DetalleLibro from './components/libros/DetalleLibro';
//import CrearLibro from './components/libros/CrearLibro';
//import CrearPrestamo from './components/prestamos/CrearPrestamo';

// importa aquí otros componentes que uses

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />  {/* <- Esto es crucial */}
          <Route path="libros" element={<Libros />} />
          <Route path="/libros/editar/:id" element={<EditarLibro />} />
          <Route path="/libros/detalle/:id" element={<DetalleLibro />} />       
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="usuarios/crear" element={<CrearUsuario />} />
          <Route path="/usuarios/editar/:id" element={<EditarUsuario />} />
          <Route path="usuarios/detalle/:id" element={<DetalleUsuario />} />    
          <Route path="prestamos/detalle/:id" element={<DetallePrestamo />} />
          <Route path="prestamos" element={<Prestamos />} />          
          <Route path="devoluciones" element={<Devoluciones />} />
          {/* otras rutas */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

/*import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Inicio from './components/Inicio';
import Libros from './components/Libros';
import Usuarios from './components/Usuarios';
import Prestamos from './components/Prestamos';
import Devoluciones from './components/Devoluciones';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="libros" element={<Libros />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="prestamos" element={<Prestamos />} />
          <Route path="devoluciones" element={<Devoluciones />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;*/