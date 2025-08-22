// components/DiagnosticoNodo.jsx

'use client';

import React, { useState } from 'react';
import axios from 'axios';

const DiagnosticoNodo = () => {
  const [pkConexion, setPkConexion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultado, setResultado] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResultado(null);

    // Validar que el input no esté vacío
    if (!pkConexion) {
      setError('Por favor, ingresa un PK de conexión.');
      setLoading(false);
      return;
    }

    try {
      // Reemplaza esta URL con la tuya real
      // Asegúrate de que este endpoint maneje la seguridad (token, etc.) como tu API de clientes
      const url = `https://g1arcofer.815d.net:815/api/diagnostico-nodo?pk_conexion=${pkConexion}`; 
      const response = await axios.get(url);
      setResultado(response.data);
      console.log('Resultado del diagnóstico:', response.data);
    } catch (err) {
      const errorMessage = err.response 
        ? `Error: ${err.response.status} - ${err.response.data.error || err.response.statusText}` 
        : err.message;
      setError(errorMessage);
      console.error('Error en la llamada a la API:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Diagnóstico de Nodo de Red</h1>

      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <label htmlFor="pkConexion" className="block text-sm font-medium mb-2">
          PK de Conexión:
        </label>
        <div className="flex items-center">
          <input
            type="text"
            id="pkConexion"
            value={pkConexion}
            onChange={(e) => setPkConexion(e.target.value)}
            placeholder="Ej: 21818"
            className="flex-grow p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Diagnosticando...' : 'Diagnosticar'}
          </button>
        </div>
      </form>

      {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg dark:text-red-300 dark:bg-red-900">{error}</div>}

      {resultado && (
        <div className="p-4 bg-green-100 text-green-800 rounded-lg dark:bg-green-900 dark:text-green-200">
          <h2 className="text-xl font-bold mb-2">Resultado:</h2>
          <pre className="whitespace-pre-wrap font-mono text-sm">{JSON.stringify(resultado, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default DiagnosticoNodo;