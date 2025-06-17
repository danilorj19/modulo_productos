// Importación de dependencias necesarias
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import {
  obtenerProductos,
  eliminarProducto
} from "../../conectarBack"; // Funciones que se conectan al backend PHP
import "./Productos.css"; // Estilos del módulo

const Productos = () => {
  // Estado para almacenar todos los productos
  const [productos, setProductos] = useState([]);

  // Estado para controlar lo que se escribe en el buscador
  const [busqueda, setBusqueda] = useState("");

  // Estado para guardar los productos que coinciden con la búsqueda
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  // Hook para redireccionar a otras rutas (por ejemplo, al editar, agregar)
  const navigate = useNavigate();

  //  Se ejecuta la función que obtiene los productos desde el backend
  useEffect(() => {
    cargarProductos();
  }, []);

  // Función que obtiene los productos desde la API PHP
  const cargarProductos = async () => {
    try {
      const data = await obtenerProductos(); // Se hace la consulta
      setProductos(data);                    // Se almacenan todos los datos
      setProductosFiltrados(data);           // También se copian para filtrar
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };

  // Función que elimina un producto si el usuario lo confirma
  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      await eliminarProducto(id); // Se llama a la función para eliminarlo
      cargarProductos(); // Luego se recarga la lista de productos
    }
  };

  // Función que redirecciona al formulario de edición, enviando el producto como parámetro
  const handleEditar = (producto) => {
    navigate('/editar', { state: { producto } });
  };

  // Función que maneja la búsqueda en tiempo real, actualizando la lista filtrada
  const handleBusqueda = (e) => {
    const texto = e.target.value.toLowerCase(); // Se convierte el texto a minúsculas
    setBusqueda(texto); // Se actualiza el estado de búsqueda

    // Se filtran los productos por nombre
    const filtrados = productos.filter((prod) =>
      prod.nombre.toLowerCase().includes(texto)
    );
    setProductosFiltrados(filtrados); // Se actualiza la lista mostrada
  };

  return (
    <div className="contenedor-productos">
      <h2>Gestión de productos</h2>

      {/* Sección superior con buscador y botones */}
      <div className="barra-superior">

        {/* Campo de entrada para buscar productos */}
        <input
          className="buscador"
          type="text"
          placeholder="Buscar..."
          value={busqueda}
          onChange={handleBusqueda}
        />

        {/* Botones de acción (cerrar sesión, volver, agregar) */}
        <div className="botones-superiores">
          {/*<button className="boton">Cerrar Sesión</button>
          <button className="boton">Volver al menú</button>*/}
          <Link to="/agregar">
            <button className="boton">Agregar nuevo producto</button>
          </Link>
        </div>
      </div>

      {/* Tabla que muestra los productos */}
      <div className="tabla-responsiva">
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio Unidad</th>
              <th>Descripción</th>
              <th>Fecha</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Si hay productos filtrados, se muestran */}
            {productosFiltrados.length > 0 ? (
              productosFiltrados.map(prod => (
                <tr key={prod.ID_producto}>
                  <td>{prod.ID_producto}</td>
                  <td>{prod.nombre}</td>
                  <td>{prod.stock}</td>
                  <td>${prod.precio}</td>
                  <td>{prod.descripcion}</td>
                  <td>{prod.fecha}</td>
                  <td>
                    {/* Botón para editar */}
                    <button className="boton-accion" onClick={() => handleEditar(prod)}>📄</button>

                    {/* Botón para eliminar */}
                    <button className="boton-accion eliminar" onClick={() => handleEliminar(prod.ID_producto)}>❌</button>
                  </td>
                </tr>
              ))
            ) : (
              // Si no hay coincidencias al buscar se muestra este mensaje
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>No se encontraron productos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Productos;


