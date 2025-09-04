"use client";
import { useEffect, useState } from 'react';

// Este es un componente de ejemplo para una página de Next.js
export default function ClientesPage() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect se ejecuta una sola vez cuando el componente se monta
  useEffect(() => {
    // Definimos una función asíncrona para obtener los datos de la API
    async function fetchClients() {
      try {
        // Hacemos la llamada a la API Gateway en el puerto 3000
        const response = await fetch('http://localhost:4000/api/clientes');
        
        // Verificamos si la respuesta fue exitosa
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.statusText}`);
        }

        // Convertimos la respuesta a JSON
        const data = await response.json();
        
        // Actualizamos el estado con los datos obtenidos
        setClients(data);
        setError(null);
      } catch (e) {
        // En caso de error, actualizamos el estado de error
        setError(e.message);
      } finally {
        // Sin importar el resultado, detenemos el estado de carga
        setIsLoading(false);
      }
    }

    fetchClients();
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez

  // --- Renderizado del componente según el estado ---
  
  // Si está cargando, mostramos un mensaje
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700">Cargando clientes...</h1>
      </div>
    );
  }

  // Si hay un error, lo mostramos en pantalla
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-red-100 p-4">
        <h1 className="text-2xl font-bold text-red-700">Error al obtener los datos</h1>
        <p className="mt-2 text-red-600 text-center">{error}</p>
        <p className="mt-4 text-gray-500">
          Asegúrate de que tu servidor Express esté corriendo en http://localhost:4000
        </p>
      </div>
    );
  }

  // Si todo es exitoso, mostramos los datos en una tabla
  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-3xl font-extrabold text-center text-indigo-800 mb-6">
        Lista de Clientes Unificados
      </h1>
      {clients.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="px-6 py-3 border-b-2 border-indigo-400 text-left text-sm font-semibold tracking-wider rounded-tl-lg">ID</th>
                <th className="px-6 py-3 border-b-2 border-indigo-400 text-left text-sm font-semibold tracking-wider">Nombre</th>
                <th className="px-6 py-3 border-b-2 border-indigo-400 text-left text-sm font-semibold tracking-wider">Cédula</th>
                <th className="px-6 py-3 border-b-2 border-indigo-400 text-left text-sm font-semibold tracking-wider">Email</th>
                <th className="px-6 py-3 border-b-2 border-indigo-400 text-left text-sm font-semibold tracking-wider">Teléfono</th>
                <th className="px-6 py-3 border-b-2 border-indigo-400 text-left text-sm font-semibold tracking-wider">Estado</th>
                <th className="px-6 py-3 border-b-2 border-indigo-400 text-left text-sm font-semibold tracking-wider rounded-tr-lg">Plan WispHub</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-100 transition-colors">
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-800 font-mono">{client.id}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-600">{client.nombre}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-600">{client.cedula}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-600">{client.email}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-600">{client.telefono}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-600">{client.estado}</td>
                  <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-600">{client.plan_wisp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-8 text-gray-500">
          <p>No se encontraron clientes.</p>
        </div>
      )}
    </div>
  );
}