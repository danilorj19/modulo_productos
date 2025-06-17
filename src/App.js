import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Productos from './components/Productos/Productos';
import AgregarProducto from './components/AgregarProducto';
import EditarProducto from './components/EditarProducto';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Productos />} />
        <Route path="/agregar" element={<AgregarProducto />} />
        <Route path="/editar" element={<EditarProducto />} />
      </Routes>
    </Router>
  );
}

export default App;