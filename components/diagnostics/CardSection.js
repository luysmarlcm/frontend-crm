import React from 'react';

export default function CardSection({ title, subtitle, children, status, IconComponent }) {
  const statusColor = status === "Activo" 
    ? 'bg-green-100 text-green-800' 
    : 'bg-red-100 text-red-800';

  return (
    <div className="bg-white rounded-lg shadow-sm p-0 border border-gray-200 mb-4 overflow-hidden">
      {/* Encabezado */}
      <div className="flex items-center justify-between bg-gray-100 p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
           {IconComponent && <IconComponent className="h-5 w-5 text-gray-600" />}
           {subtitle && (
            <span className="text-sm text-gray-500 ml-2">{subtitle}</span>
          )}
         
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
         
        </div>

        {/* Ejemplo: puedes usar status como pill */}
        {status && (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
            {status}
          </span>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
