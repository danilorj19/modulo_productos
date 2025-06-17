import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { actualizarProducto } from "../conectarBack.js";
import './AgregarProducto.css';

const EditarProducto = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(state?.producto || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actualizarProducto(producto);
    navigate('/');
  };

  return (
    <div className="formulario-container">
      <form className="formulario-producto" onSubmit={handleSubmit}>
        <h2>Editar producto</h2>
        <input
        type="text"
        name="ID_producto"
        value={producto.ID_producto}
        readOnly
        />
        <input 
        type="text" 
        name="nombre" 
        value={producto.nombre} 
        onChange={handleChange} 
        required 
        />
        <input 
        type="number" 
        name="stock" 
        value={producto.stock} 
        onChange={handleChange} 
        required 
        />
        <input 
        type="number" 
        name="precio" 
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
        <button type="submit">Actualizar producto</button>
      </form>
    </div>
  );
};

export default EditarProducto;