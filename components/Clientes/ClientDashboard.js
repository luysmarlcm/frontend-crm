
// components/Clientes/ClientDashboard.js
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Controls from './Controls';
import HeaderPage from '../HeaderPage';
import { CircleUser, SquareGanttChart } from 'lucide-react'; 
import ClientTable from './ClientTable';


export default function ClientDashboard() {
    const [clientes, setClientes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
    const fetchAndCombineData = async () => {
      try {
        setLoading(true);
        setError(null);
        const clientsResponse = await axios.get('/api/clientes');
        const clientsData = clientsResponse.data || [];
        console.log('Datos de clientes:', clientsData);
        setClientes(clientsData);
      } catch (err) {
        const errorMessage = err.response 
          ? `Error: ${err.response.status} - ${err.response.statusText}` 
          : err.message;
        setError(errorMessage);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAndCombineData();
  }, []);

  console.log(clientes)

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <HeaderPage
            title="Lista de Clientes"
            // actions={clientActions}
            IconComponent={CircleUser}
            // description="Manage, filter, and act on clients"
          />
      <div className="bg-white rounded-lg shadow-md p-6">
        <Header />
        <Controls />
        <ClientTable clientes={clientes} loading={loading} error={error} />
      </div>
    </div>
  );
}