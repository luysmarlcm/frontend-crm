// components/tabs/TicketsTab.jsx
import React from 'react';
import { Ticket } from 'lucide-react';

export default function TicketsTab() {
  return (
    <div className="p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex flex-col items-center justify-center space-y-4 text-center text-gray-500">
        <Ticket size={48} />
        <h2 className="text-xl font-semibold">Sección de Tickets</h2>
        <p>Aquí se gestionarán los tickets asociados a este cliente.</p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Crear Nuevo Ticket
        </button>
      </div>
    </div>
  );
}