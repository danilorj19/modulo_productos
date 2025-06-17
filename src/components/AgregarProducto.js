import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { agregarProducto } from "../conectarBack.js";
import './AgregarProducto.css'; //tener este archivo con los estilos

const AgregarProducto = () => {
  // Estado para cada campo del formulario
  const [producto, setProducto] = useState({
    nombre: '',
    stock: '',
    precio: '',
    descripcion: '',
    fecha: ''
  });

   const navigate = useNavigate();

  // Función para manejar los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    await agregarProducto(producto);
    navigate('/');
  };

  return (
    <div className="formulario-container">
      <form className="formulario-producto" onSubmit={handleSubmit}>
        <h2>Información del nuevo producto</h2>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={producto.nombre}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="stock"
          placeholder="Cantidad"
          value={producto.stock}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="precio"
          placeholder="Precio Unidad"
          value={producto.precio}
          onChange={handleChange}
          required
        />
        <textarea
        className="descripcion"
          name="descripcion"
          placeholder="Descripción"
          maxLength={100}
          rows="2"
          value={producto.descripcion}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="date"
          name="fecha"
          value={producto.fecha}
          onChange={handleChange}
          required
        />
        <button type="submit">Guardar producto</button>
      </form>
    </div>
  );
};

export default AgregarProducto;
