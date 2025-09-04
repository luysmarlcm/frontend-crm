'use client';

import { useState, useMemo } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CardSection from './CardSection';
import DataField from './DataField';
import { Gauge, Search, IdCard, LifeBuoy, ArrowDownUp, Info, Waypoints } from 'lucide-react';
import HeaderPage from '../HeaderPage';
import Tabs from '../Tabs';
import { DiagnosticsTab } from '../Tabs/DiagnosticsTab';
import TicketsTab from '../Tabs/TicketsTab';
import ClientDataTab from '../Tabs/ClientDataTab';
import FullScreenLoader from '../FullScreenLoader';


const tabs = [
    {
      id: 'client-data',
      label: 'DATOS DE CLIENTE',
      content: <ClientDataTab />,
    },
    {
      id: 'diagnostics',
      label: 'DIAGNÓSTICO',
      // content: <DiagnosticsTab />,
    },
    {
      id: 'tickets',
      label: 'TICKETS',
      content: <TicketsTab />,
    },
  ];


export default function ConnectionDiagnostics() {
  const [cedula, setCedula] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [multipleConnections, setMultipleConnections] = useState(null);

  const fetchData = async (cedula) => {
    setLoading(true);
    setError(null);
    setResultado(null);
    setMultipleConnections(null);

    try {
      const response = await axios.get(`http://localhost:4000/api/clientes/cedula/${cedula}`);

      // Si la API devuelve un array de múltiples conexiones
      if (Array.isArray(response.data) && response.data.length > 1) {
        setMultipleConnections(response.data);
      } else {
        // Caso de un único cliente
        setResultado(Array.isArray(response.data) ? response.data[0] : response.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cedula) {
      setError('Por favor, ingresa una cédula.');
      return;
    }
    fetchData(cedula);
  };

  const handleConnectionSelect = (pk) => {
    if (!multipleConnections) return;
    const selected = multipleConnections.find(conn => conn.pk === pk);
    if (selected) setResultado(selected);
    setMultipleConnections(null);
  };

  const connectionData = resultado?.conexion || {};
  const onuData = resultado?.onu || {};

  console.log(resultado, "json")

  const tabs = [
    {
      id: 'client-data',
      label: 'DATOS DE CLIENTE',
      content: <ClientDataTab resultado={resultado} />,
    },
    {
      id: 'diagnostics',
      label: 'DIAGNÓSTICO',
      content: <DiagnosticsTab resultado={resultado} />,
    },
    // {
    //   id: 'tickets',
    //   label: 'TICKETS',
    //   content: <TicketsTab />,
    // },
  ];

  // const { pingTimes, pingSummary } = useMemo(() => parsePingResults(connectionData.conexion_ping_icmp), [connectionData.conexion_ping_icmp]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <HeaderPage title="Diagnóstico de Conexión" IconComponent={Gauge} />
        </div>

      <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row items-end sm:items-center gap-4 mb-6 bg-white shadow-md py-5 px-6 rounded-xl"
      >
            <div className="flex-1 w-full">
              <label 
                htmlFor="client-id" 
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Cédula
              </label>
              <input
                type="number"
                id="client-id"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                placeholder="Cédula del cliente"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Search className='w-5 h-5' />
              <span>{loading ? 'Buscando...' : 'Buscar'}</span>
            </button>
      </form>

      {loading &&  <FullScreenLoader show={loading} text="Buscando informacion de cliente..." />}
        {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}
        
        {resultado && !multipleConnections && (
           <Tabs tabs={tabs} />
          )} 
        

          {/* {loading && <div className="p-4 mb-4 text-blue-700 bg-blue-100 rounded-lg">Cargando...</div>}
          {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}

          {multipleConnections && (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-lg shadow-inner mb-6">
              <h2 className="text-xl font-bold mb-4">Se encontraron múltiples conexiones.</h2>
              <div className="space-y-4">
                {multipleConnections.map(conn => (
                  <div
                    key={conn.pk}
                    className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleConnectionSelect(conn.pk)}
                  >
                    <p className="font-semibold text-lg">{conn.fields.nombre_completo}</p>
                    <p className="text-sm text-gray-600">PK: <span className="font-mono">{conn.pk}</span></p>
                    <p className="text-sm text-gray-600">Dirección: {conn.fields.domicilio || '—'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resultado && !multipleConnections && (
            <>
              <CardSection title="Datos Cliente" IconComponent={IdCard}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  <DataField label="Cliente" value={connectionData.conexion_nombre || '—'} />
                  <DataField label="Plan" value={connectionData.plan_nombre || '—'} />
                  <DataField label="Dirección IP" value={connectionData.direccion_ip || '—'} />
                  <DataField label="MAC Actual" value={connectionData.mac_actual || '—'} />
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
            </>
          )} */}
      </div>
    </div>
  );
}