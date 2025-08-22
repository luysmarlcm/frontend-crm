// components/ClientRow.jsx

import StatusBadge from './StatusBadge';

export default function ClientRow({ client }) {
  console.log(client, 'desde ClientRow');
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.id_servicio}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{client.nombre}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.conector}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.direccion_ip_815?.direccion_ip}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <StatusBadge status={client.status} />
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.plan_internet?.nombre}</td>
      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.router}</td> */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{client.ciudad_815}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <button className="flex items-center space-x-1 hover:underline">
          <span className="text-sm inline-flex items-center px-2.5 py-0.5 rounded-full font-medium bg-blue-700">Ver</span>
         
        </button>
      </td>
    </tr>
  );
}