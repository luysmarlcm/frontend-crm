// components/common/HeaderPage.jsx
import React from 'react';

export default function HeaderPage({ title, actions, description, IconComponent }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        {IconComponent && <IconComponent className="h-6 w-6 text-gray-800" />}
        <h1 className="text-2xl font-extrabold text-gray-800">{title}</h1>
        {actions && actions.left}
      </div>
      <div className="flex items-center space-x-2">
        {description && <p className="text-sm text-gray-500">{description}</p>}
        {actions && actions.right}
      </div>
    </div>
  );
}