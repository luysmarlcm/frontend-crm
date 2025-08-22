// components/diagnostics/CardSection.jsx

import React from 'react';

export default function CardSection({ title, children, status, IconComponent }) {
  const statusColor = status === 'OK' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <div className="bg-white rounded-lg shadow-sm p-0 border border-gray-200 mb-4 overflow-hidden">
      {/* Nuevo contenedor para el encabezado */}
      <div className="flex items-center space-x-2 bg-gray-100 p-4 border-b border-gray-200">
        {IconComponent && <IconComponent className="h-5 w-5 text-gray-600" />}
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      {/* El contenido de la tarjeta se mueve dentro de su propio contenedor con padding */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}