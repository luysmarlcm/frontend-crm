// components/diagnostics/DataField.jsx

import React from 'react';

export default function DataField({ label, value }) {
  return (
    <div className="flex flex-col text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value || '—'}</span>
    </div>
  );
}