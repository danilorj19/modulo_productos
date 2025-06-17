// URL base del backend PHP donde se manejan las operaciones CRUD
const API_URL = 'http://localhost/modulo_productos/';

// Función para obtener todos los productos desde el backend
export const obtenerProductos = async () => {
  const response = await fetch(API_URL); // Realiza una petición GET
  return response.json(); // Convierte la respuesta en formato JSON
};

// Función para agregar un nuevo producto al backend
export const agregarProducto = async (producto) => {
  const response = await fetch(API_URL, {
    method: 'POST', // Se especifica que es una solicitud POST
    headers: { 'Content-Type': 'application/json' }, // Se indica que se envía JSON
    body: JSON.stringify(producto) // Se convierte el objeto JS a una cadena JSON
  });
  return response.json(); // Devuelve la respuesta del servidor en JSON
};

// Función para actualizar un producto existente en el backend
export const actualizarProducto = async (producto) => {
  const response = await fetch(API_URL, {
    method: 'PUT', // Se especifica que es una solicitud PUT
    headers: { 'Content-Type': 'application/json' }, // Tipo de contenido enviado
    body: JSON.stringify(producto) // Se envía el producto modificado
  });
  return response.json(); // Devuelve la respuesta del servidor en formato JSON
};

// Función para eliminar un producto del backend
export const eliminarProducto = async (id) => {
  const response = await fetch(API_URL, {
    method: 'DELETE', // Se especifica que es una solicitud DELETE
    headers: {
      'Content-Type': 'application/json', // Tipo de contenido enviado
    },
    body: JSON.stringify({ ID_producto: id }) // Se envía el ID del producto a eliminar
  });
  return response.json(); // Devuelve la respuesta del servidor en JSON
};
