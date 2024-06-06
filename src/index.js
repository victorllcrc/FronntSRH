import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './AuthContext'; // Importar AuthProvider
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // Obtener el elemento raíz
root.render(
  <React.StrictMode> {/* Opcional, pero recomendado para desarrollo */}
    <AuthProvider> {/* Proveer el contexto de autenticación */}
      <BrowserRouter> {/* Para manejar rutas */}
        <App /> {/* Componente principal */}
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>, // Verificar cierre correcto de etiquetas
  document.getElementById('root') // Referencia al elemento raíz en el DOM
);

reportWebVitals(); // Para medir el rendimiento de la aplicación
