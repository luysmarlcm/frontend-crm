'use client';

import { useState, useMemo } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CardSection from './CardSection';
import DataField from './DataField';
import { Gauge, Search, IdCard, LifeBuoy, Network, ArrowDownUp, Info, Waypoints } from 'lucide-react';
import HeaderPage from '../HeaderPage';


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

export default function ConnectionDiagnostics() {
  const [cedula, setCedula] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [multipleConnections, setMultipleConnections] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResultado(null);
    setMultipleConnections(null);

    if (!cedula) {
      setError('Por favor, ingresa una cédula.');
      setLoading(false);
      return;
    }
    
    // Inicia la búsqueda inicial con la cédula
    await fetchData(`/api/diagnostico-nodo?cedula=${cedula}`);
  };

  const handleConnectionSelect = async (pk) => {
    setLoading(true);
    setError(null);
    setResultado(null);
    setMultipleConnections(null);
    // Realiza la segunda llamada con el PK seleccionado
    await fetchData(`/api/diagnostico-nodo?cedula=${cedula}&pk=${pk}`);
  };

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      
      if (response.data.status === 'multiple_connections') {
        setMultipleConnections(response.data.data);
      } else {
        setResultado(response.data);
      }
      console.log('Resultado de la API:', response.data);
    } catch (err) {
      const errorMessage = err.response
        ? `Error: ${err.response.status} - ${err.response.data.error || err.response.statusText}`
        : err.message;
      setError(errorMessage);
      console.error('Error en la llamada a la API:', err);
    } finally {
      setLoading(false);
    }
  };

  const connectionData = resultado?.conexion || {};
  const onuData = resultado?.onu || {};

  // Parseamos los resultados del ping una sola vez
  const { pingTimes, pingSummary } = useMemo(() => {
    return parsePingResults(connectionData.conexion_ping_icmp);
  }, [connectionData.conexion_ping_icmp]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <HeaderPage title="Diagnóstico de Conexión" IconComponent={Gauge} />
        </div>
        <form onSubmit={handleSubmit} className="flex items-end space-x-4 mb-6 bg-gray-50 py-4 px-6 rounded-md">
          <div className="flex-1">
             <label htmlFor="hub-zone" className="block text-sm font-medium text-gray-700">HUB / Zona</label>
             <div className="relative mt-1 rounded-md shadow-sm bg-white border border-gray-300">
               <select id="hub-zone" className="focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-4 sm:text-sm border-gray-300 rounded-md text-black placeholder:text-gray-400">
                 <option value="">Seleccione HUB o Zona</option>
                 <option value="hub1">HUB 1</option>
                 <option value="hub2">HUB 2</option>
                 <option value="zona1">Zona 1</option>
                 <option value="zona2">Zona 2</option>
               </select>
             </div>
          </div>
          <div className="flex-1">
            <label htmlFor="client-id" className="block text-sm font-medium text-gray-700">Cédula</label>
            <input
              type="number"
              id="client-id"
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md placeholder:text-gray-400 bg-white text-black"
              placeholder="Cédula del cliente"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 bg-green-500 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-green-600 transition-colors font-extrabold disabled:bg-gray-400"
          >
            <Search className='w-5 h-5' />
            <span>{loading ? 'Buscando...' : 'Buscar'}</span>
          </button>
        </form>

        {loading && (
          <div className="p-4 mb-4 text-blue-700 bg-blue-100 rounded-lg">Cargando...</div>
        )}
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>
        )}

        {/* Manejo de múltiples conexiones */}
        {!loading && multipleConnections && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-lg shadow-inner mb-6">
            <h2 className="text-xl font-bold mb-4">Se encontraron múltiples conexiones.</h2>
            <p className="mb-4">Por favor, selecciona la que deseas diagnosticar:</p>
            <div className="space-y-4">
              {multipleConnections.map((conn) => (
                <div
                  key={conn.pk}
                  className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleConnectionSelect(conn.pk)}
                >
                  <p className="font-semibold text-lg">{conn.fields.nombre_completo}</p>
                  <p className="text-sm text-gray-600">PK de Conexión: <span className="font-mono">{conn.pk}</span></p>
                  <p className="text-sm text-gray-600">Dirección: {conn.fields.domicilio || '—'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Muestra las cards SOLO SI NO SE ESTÁ CARGANDO, NO HAY MÚLTIPLES CONEXIONES Y HAY RESULTADOS */}
        {!loading && resultado && !multipleConnections && (
          <>
            <CardSection title="Datos Cliente" IconComponent={IdCard}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                <DataField label="Cliente" value={connectionData.conexion_nombre || '—'} />
                <DataField label="Conexión" value={connectionData.conexion_nombre || '—'} />
                <DataField label="Plan" value={connectionData.plan_nombre || '—'} />
                <DataField label="Dirección IP" value={connectionData.direccion_ip || '—'} />
                <DataField label="MAC Cargada" value={connectionData.mac_registrada || '—'} />
                <DataField label="MAC Actual" value={connectionData.mac_actual || '—'} />
              </div>
            </CardSection>

            <CardSection title="ONU / OLT Valores" IconComponent={LifeBuoy}>
              <div className="grid grid-cols-3 gap-4">
                <DataField label="Onu Status" value={<span className={` ${onuData.onu_status === 'Online' ? 'text-green-500' : 'text-red-500'}`}>{onuData.onu_status || '—'}</span>} />
                <DataField label="ONU RX" value={onuData.onu_rx || '—'} />
                <DataField label="ONU TX" value={onuData.onu_tx || '—'} />
                <DataField label="OLT RX" value={onuData.onu_rx || '—'} />
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
                        <LineChart data={pingTimes} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="sequence" label={{ value: 'Secuencia de Paquetes', position: 'insideBottom', offset: -5 }} />
                            <YAxis label={{ value: 'Tiempo de Ping (ms)', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Line type="monotone" dataKey="time" stroke="#82ca9d" name="Tiempo" />
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

            <CardSection title="Tráfico Conexión" IconComponent={ArrowDownUp}>
              <div className="grid grid-cols-3 gap-4">
                <DataField label="Transferencia Mensual" value={connectionData.conexion_transferencia_mensual} />
                <DataField label="Bajada Mensual" value={connectionData.conexion_bajada_mensual || '—'} />
                <DataField label="Subida Mensual" value={connectionData.conexion_subida_mensual || '—'} />
              </div>
            </CardSection>
          </>
        )}
      </div>
    </div>
  );
}