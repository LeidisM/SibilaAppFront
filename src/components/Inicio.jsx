import './Inicio.css';
import imagen from '../assets/inicio.jpg';

const Inicio = () => {
  return (
    <div className="inicio-container">
      <h1 className="titulo-inicio">Bienvenido a Sibila App</h1>
      <img src={imagen} alt="Imagen de bienvenida" className="inicio-imagen" />
    </div>
  );
};

export default Inicio;
