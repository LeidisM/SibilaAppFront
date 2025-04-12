import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Inicio from './components/Inicio';
import Libros from './components/Libros';
import Usuarios from './components/Usuarios';
import Prestamos from './components/Prestamos';
import Devoluciones from './components/Devoluciones';
// importa aquí otros componentes que uses

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />  {/* <- Esto es crucial */}
          <Route path="libros" element={<Libros />} />
          <Route path="usuarios" element={<Usuarios />} />
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