// components/tabs/ClientDataTab.jsx
import React from 'react';
import CardSection from '../diagnostics/CardSection';
import DataField from '../diagnostics/DataField';
import { User, CreditCard, Mail, Phone, Calendar } from 'lucide-react';

export default function ClientDataTab({resultado}) {


  return (
    <div>
      {/* Sección de Datos de Identificación (similar al diseño de "Client Details") */}
      <CardSection title={resultado.nombre} IconComponent={User}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
          <DataField label="Nombre y Apellido" value={resultado.nombre} />
          <DataField label="Zona" value={resultado.ciudad_815} />
          <DataField label="Domicilio" value={resultado.direccion} />
          <DataField label="Teléfono" value={resultado.telefono} />
          <DataField label="Email" value={resultado.email} />
          <DataField label="Fecha de alta" value={resultado.fecha_de_alta} />
          <DataField label="Estado" value={<span className={` ${resultado.estado === 'Activo' ? 'text-green-500' : 'text-red-500'}`}>{resultado.estado || '—'}</span>} />
          <DataField label="Estado factura" value={resultado.estado_facturas} />
          <DataField label="Fecha de corte" value={resultado.fecha_corte} />

        </div>
      </CardSection>

      {/* Puedes agregar más secciones si es necesario */}
    </div>
  );
}