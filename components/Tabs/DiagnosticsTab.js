"use client";
import { useState, useMemo } from 'react';
import CardSection from '../diagnostics/CardSection';   
import DataField from '../diagnostics/DataField';
import TableTraffic from '../TrafficTable'; 
import { IdCard, Waypoints, Gauge, Search, LifeBuoy, Network, ArrowDownUp, Info, Table, MonitorUp, ChartLine } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Función utilitaria para parsear los resultados del ping
const parsePingResults = (pingData) => {
  if (!pingData) {
    return { pingTimes: [], pingSummary: '' };
  }

  const pingTimes = [];
  const individualPingRegex = /icmp_seq=(\d+)\s+ttl=\d+\s+time=(\d+\.\d+)\s+ms/g;

  let match;
  while ((match = individualPingRegex.exec(pingData)) !== null) {
    pingTimes.push({
      sequence: parseInt(match[1]),
      time: parseFloat(match[2]),
    });
  }

  const summaryRegex = /---.*?ping statistics ---\n[\s\S]*?rtt min\/avg\/max\/mdev =.*?\n/g;
  const summaryMatch = pingData.match(summaryRegex);
  const pingSummary = summaryMatch ? summaryMatch[0] : '';

  return { pingTimes, pingSummary };
};

export const DiagnosticsTab = ({resultado}) => {

  console.log("DiagnosticsTab resultado:", resultado);

 const connectionData = resultado?.conexion || {};
  const onuData = resultado?.onu || {};
   
    const { pingTimes, pingSummary } = useMemo(() => parsePingResults(connectionData.conexion_ping_icmp), [connectionData.conexion_ping_icmp]);
    
  return (
      <>
            <CardSection title={connectionData.conexion_nombre}  IconComponent={ChartLine}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <DataField label="Cliente" value={connectionData.conexion_nombre || '—'} />
                <DataField label="Plan" value={connectionData.plan_nombre || '—'} />
                <DataField label="Dirección IP" value={connectionData.direccion_ip || '—'} />
                <DataField label="MAC Actual" value={connectionData.mac_actual || '—'} />
              </div>
            </CardSection>

            <CardSection title="ONU / OLT Valores" IconComponent={LifeBuoy}>
              <div className="grid grid-cols-3 gap-4">
                <DataField label="Onu Status" value={<span className={` ${onuData.onu_status === 'Online' ? 'text-green-500' : 'text-red-500'}`}>{onuData.onu_status || '—'}</span>} />
                <DataField label="ONU RX" value={onuData.onu_rx || '—'} />
                <DataField label="ONU TX" value={onuData.onu_tx || '—'} />
               
                 <DataField
                  label="OLT RX"
                  value={
                    connectionData.registro_evento?.[2]?.[2]
                      ? `${connectionData.registro_evento?.[2]?.[2]} dBm`
                      : "—"
                  }
                />
                <DataField label="OLT TX" value={connectionData.registro_evento?.[10]?.[2] || '—'} />
                
              </div>
            </CardSection>

            <CardSection title="Información Adicional" IconComponent={Info}>
              <div className="grid grid-cols-3 gap-4">
                <DataField label="Onu Modelo" value={onuData.onu_producto || '—'} />
                <DataField label="Version Firmware" value={onuData.onu_firmware || '—'} />
                <DataField label="Numero de Serie" value={onuData.onu_numero_de_serie || '—'} />
              </div>
            </CardSection>

            {pingTimes.length > 0 && (
              <CardSection title="Tiempos de Ping (ms)" IconComponent={Waypoints}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={pingTimes}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="sequence" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="time" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardSection>
            )}
            {pingSummary && (
                <CardSection title="Estadísticas de Ping" IconComponent={Waypoints}>
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 bg-gray-50 p-4 rounded-lg overflow-x-auto">
                        {pingSummary}
                    </pre>
                </CardSection>
            )}

            <CardSection title="Tráfico Semanal" IconComponent={ArrowDownUp}>
              <div className="grid grid-cols-3 gap-4">
                <DataField label="Transferencia Mensual" value={connectionData.conexion_transferencia_mensual} />
                <DataField label="Bajada Mensual" value={connectionData.conexion_bajada_mensual || '—'} />
                <DataField label="Subida Mensual" value={connectionData.conexion_subida_mensual || '—'} />
              </div>
            </CardSection>
            <CardSection title="Historial Trafico" IconComponent={MonitorUp}>
             <TableTraffic data={connectionData.trafico_semanal || []} />
            </CardSection> 
          </>
  )
}
