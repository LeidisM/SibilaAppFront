import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Inicio from './components/Inicio';
import Libros from './components/Libros';
// importa aquí otros componentes que uses

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />  {/* <- Esto es crucial */}
          <Route path="libros" element={<Libros />} />
          {/* otras rutas */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
