// components/ClientTable.jsx

import ClientRow from './ClientRow';
import TableFilters from './TableFilters';

export default function ClientTable({ clientes, loading, error }) {
  console.log(clientes, 'desde ClientTable');

  // Si loading es true, mostramos un mensaje de carga.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500 text-lg">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-500 text-lg">No se encontraron clientes.</p>
      </div>
    );
  }

  // Si loading es false y hay clientes, mostramos la tabla.
  return (
    <div>
      <div className="flex justify-between items-center text-gray-500 text-sm mb-4">
        <div className="flex items-center space-x-2">
          <div className="border border-gray-300 rounded-md">
            <select className="bg-white px-3 py-1.5 rounded-md outline-none appearance-none">
              <option>Show 10 records</option>
            </select>
          </div>
          <button className="bg-gray-200 text-gray-700 px-4 py-1.5 rounded-md hover:bg-gray-300 transition-colors">
            Table
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <span>Sortable columns</span>
          <span className="text-gray-400">|</span>
          <span>Column filters</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-3 text-left font-medium">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              </th>
              <th scope="col" className="px-6 py-3 text-left font-medium">ID</th>
              <th scope="col" className="px-6 py-3 text-left font-medium">Nombre</th>
              <th scope="col" className="px-6 py-3 text-left font-medium">Conector</th>
              <th scope="col" className="px-6 py-3 text-left font-medium">Direccion IP</th>
              <th scope="col" className="px-6 py-3 text-left font-medium">Estatus</th>
              <th scope="col" className="px-6 py-3 text-left font-medium">Plan</th>
              <th scope="col" className="px-6 py-3 text-left font-medium">Zona</th>
              <th scope="col" className="px-6 py-3 text-left font-medium"></th>
            </tr>
          </thead>
          <TableFilters />
          <tbody className="bg-white divide-y divide-gray-200">
            {clientes.map(client => (
              <ClientRow key={client.pk} client={client} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}