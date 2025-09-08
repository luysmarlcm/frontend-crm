'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Gauge, Search } from 'lucide-react';
import HeaderPage from '../HeaderPage';
import Tabs from '../Tabs';
import { DiagnosticsTab } from '../Tabs/DiagnosticsTab';
import TicketsTab from '../Tabs/TicketsTab';
import ClientDataTab from '../Tabs/ClientDataTab';
import FullScreenLoader from '../FullScreenLoader';

export default function ConnectionDiagnostics() {
  const [cedula, setCedula] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingDiagnostico, setLoadingDiagnostico] = useState(false);
  const [error, setError] = useState(null);

  const [resultado, setResultado] = useState(null); // solo cliente
  const [diagnostico, setDiagnostico] = useState(null); // diagnóstico
  const [multipleConnections, setMultipleConnections] = useState(null);

  const [activeTab, setActiveTab] = useState('client-data');
  const URL_SERVER = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";


  // 🔹 Normalizar datos (usa pk o id_servicio como fallback)
  const normalizeClient = (client) => {
    if (!client) return null;
    return {
      pk: client.pk || client.id_servicio,
      ...client,
    };
  };

  const fetchData = async (cedula) => {
    setLoading(true);
    setError(null);
    setResultado(null);
    setMultipleConnections(null);
    setDiagnostico(null);

    try {
      const response = await axios.get(`${URL_SERVER}/api/clientes/cedula/${cedula}`);

      if (Array.isArray(response.data) && response.data.length > 1) {
        // múltiples conexiones → mostrar lista
        setMultipleConnections(response.data.map(c => normalizeClient(c.cliente)));
      } else {
        const cliente = Array.isArray(response.data) ? response.data[0].cliente : response.data.cliente;
        setResultado(normalizeClient(cliente));
      }

      console.log('Resultado de la API:', response.data);
      setCedula('');
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
    if (selected) setResultado(normalizeClient(selected));
  };

  const handleBackToConnections = () => {
    setResultado(null); // quitar el detalle
  };

  // 🔹 Reset diagnóstico cuando cambia el contrato
  useEffect(() => {
    setDiagnostico(null);
  }, [resultado?.pk]);

  // 🔹 Cargar diagnóstico solo cuando se abre la pestaña
  const pk = resultado?.pk ?? null;

  useEffect(() => {
    console.log('DEBUG useEffect diagnóstico:', { activeTab, pk, resultado });
    if (activeTab === 'diagnostics' && pk) {
      const fetchDiagnostico = async () => {
        setLoadingDiagnostico(true);
        try {
          const response = await axios.get(
            `${URL_SERVER}/api/diagnostico-nodo?pk=${pk}`
          );
          setDiagnostico(response.data);
        } catch (err) {
          setDiagnostico({ error: "No se pudo obtener diagnóstico" });
        } finally {
          setLoadingDiagnostico(false);
        }
      };
      fetchDiagnostico();
    }
  }, [activeTab, pk]); // 👈 Solo depende de activeTab y pk



  const tabs = [
    {
      id: 'client-data',
      label: 'DATOS DE CLIENTE',
      content: <ClientDataTab resultado={resultado} />,
    },
   {
  id: 'diagnostics',
  label: 'DIAGNÓSTICO',
  content: (
    <>
      {loadingDiagnostico && (
        <div className="flex items-center justify-center py-6">
          <span className="animate-spin h-6 w-6 border-4 border-green-500 border-t-transparent rounded-full mr-3"></span>
          <span className="text-gray-700 font-semibold">Cargando diagnóstico...</span>
        </div>
      )}
      {!loadingDiagnostico && diagnostico && (
        <DiagnosticsTab resultado={diagnostico} />
      )}
      {!loadingDiagnostico && !diagnostico && resultado && (
        <div className="flex flex-col items-center py-4">
          <button
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-colors font-bold mb-4"
            onClick={async () => {
              setLoadingDiagnostico(true);
              try {
                // Obtener zona del cliente (ajusta según tu estructura)
                const zona = resultado?.zona?.nombre || resultado?.zona || resultado?.ciudad_815 || resultado?.ciudad;
                const response = await axios.get(
                  `http://172.16.1.37:4000/api/diagnostico-nodo?pk=${resultado.pk}&zona=${zona}`
                );
                setDiagnostico(response.data);
              } catch (err) {
                setDiagnostico({ error: "No se pudo obtener diagnóstico" });
              } finally {
                setLoadingDiagnostico(false);
              }
            }}
          >
            Generar diagnóstico
          </button>
          <p className="text-gray-500 text-center">Haz clic para obtener el diagnóstico de este cliente.</p>
        </div>
      )}
      {!loadingDiagnostico && !diagnostico && !resultado && (
        <p className="text-gray-500 text-center py-4">
          Selecciona un cliente y abre esta pestaña para ver el diagnóstico.
        </p>
      )}
    </>
  ),
},
    // {
    //   id: 'tickets',
    //   label: 'TICKETS',
    //   content: <TicketsTab resultado={resultado} />,
    // },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-6">
          <HeaderPage title="Diagnóstico de Conexión" IconComponent={Gauge} />
        </div>

        {/* Formulario de búsqueda */}
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

        {/* Loader y errores */}
        {loading && <FullScreenLoader show={loading} text="Buscando información de cliente..." />}
        {error && <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">{error}</div>}

        {/* Lista de múltiples conexiones */}
        {multipleConnections && !resultado && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 p-6 rounded-lg shadow-inner mb-6">
            <h2 className="text-xl font-bold mb-4">Se encontraron múltiples conexiones.</h2>
            <div className="space-y-4">
              {multipleConnections.map((conn, idx) => (
                <div
                  key={conn.pk || idx}
                  className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleConnectionSelect(conn.pk)}
                >
                  <p className="font-semibold text-lg">
                    {conn.nombre_completo || conn.nombre || "Sin nombre"}
                  </p>
                  <p className="text-sm text-gray-600">Contrato: <span className="font-mono">{conn.pk}</span></p>
                  <p className="text-sm text-gray-600">Dirección: {conn.domicilio || conn.direccion || '—'}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detalle de un contrato seleccionado con botón de volver */}
        {resultado && (
          <div>
            {multipleConnections && (
              <button
                onClick={handleBackToConnections}
                className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                ← Volver a conexiones
              </button>
            )}
            <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        )}
      </div>
    </div>
  );
}
