// components/PingChart.jsx
'use client'; // Si estás usando Next.js 13+ con App Router

import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const PingChart = ({ data }) => {
  // Asegúrate de que los datos no estén vacíos antes de renderizar
  if (!data || data.length === 0) {
    return <p>No hay datos de ping para mostrar.</p>;
  }

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="sequence" 
            label={{ value: 'Secuencia ICMP', position: 'insideBottom', offset: -15 }}
          />
          <YAxis 
            label={{ value: 'Tiempo (ms)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Line 
            type="monotone" 
            dataKey="time" 
            stroke="#8884d8" 
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};