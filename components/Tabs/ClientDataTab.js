// components/tabs/ClientDataTab.jsx
import React from 'react';
import CardSection from '../diagnostics/CardSection';
import DataField from '../diagnostics/DataField';
import { User, CreditCard, Mail, Phone, Calendar, Check, X } from 'lucide-react';
import StatusBadge from '../StatusBadge';


export default function ClientDataTab({resultado}) {
  return (
    <div>
      {/* Sección de Datos de Identificación (similar al diseño de "Client Details") */}
      <CardSection title={resultado.nombre} subtitle={resultado.ciudad_815} status={resultado.estado} IconComponent={User}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
          <DataField label="Nombre y Apellido" value={resultado.nombre} />
          <DataField label="Ceduela" value={resultado.cedula} />
          <DataField label="Domicilio" value={resultado.direccion} />
          <DataField label="Zona" value={resultado.ciudad_815} />
          <DataField label="Teléfono" value={resultado.telefono} />
          <DataField label="Email" value={resultado.email} />
          <DataField label="Fecha de instalacion" value={resultado.fecha_de_alta} />
          <DataField label="Contrato" value={resultado.conector} />
          <DataField label="Plan Contratado" value={resultado.plan_internet?.nombre} />
         <DataField
          label="Estado de Contrato"
          value={<StatusBadge status={resultado.estado} />}
        />

          <DataField
            label="Estado de 815"
            value={
              resultado.activa === true ? (
                <Check className="text-green-500 w-5 h-5" />
              ) : (
                <X className="text-red-500 w-5 h-5" />
              )
            }
          />
          <DataField label="Estado factura" value={resultado.estado_facturas} />
          {/* <DataField
            label="Saldo"
            value={
              <span
                className={
                  resultado.saldo < 0
                    ? "text-red-500 font-semibold"
                    : "text-green-600 font-semibold"
                }
              >
                {resultado.saldo}
              </span>
            }
          /> */}
          <DataField label="Fecha de corte" value={resultado.fecha_corte} />

        </div>
      </CardSection>

      {/* Puedes agregar más secciones si es necesario */}
    </div>
  );
}